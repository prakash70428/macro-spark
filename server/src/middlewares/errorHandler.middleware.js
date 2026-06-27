'use strict'

const mongoose = require('mongoose')
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const { formatError } = require('../utils/formatResponse')
const { HTTP } = require('../constants/statusCodes')
const { ERROR_CODES } = require('../constants/errorCodes')
const logger = require('../config/logger')

const isProd = process.env.NODE_ENV === 'production'

/**
 * Normalises known third-party errors into AppError instances.
 *
 * @param {Error} err
 * @returns {AppError}
 */
function normaliseError(err) {
  // JWT errors
  if (err instanceof TokenExpiredError) {
    return AppError.unauthorized('Token has expired', ERROR_CODES.TOKEN_EXPIRED)
  }
  if (err instanceof JsonWebTokenError) {
    return AppError.unauthorized('Invalid token', ERROR_CODES.TOKEN_INVALID)
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }))
    return new AppError(
      'Validation failed',
      HTTP.UNPROCESSABLE_ENTITY,
      ERROR_CODES.VALIDATION_ERROR,
      details
    )
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field'
    return AppError.conflict(`${field} already exists`)
  }

  // Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return AppError.notFound()
  }

  return err
}

/**
 * Global error handling middleware.
 * MUST be the last middleware registered in app.js.
 * Never exposes stack traces in production.
 *
 * @type {import('express').ErrorRequestHandler}
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  const normalised = normaliseError(err)

  const statusCode = normalised.statusCode ?? HTTP.INTERNAL_SERVER_ERROR
  const code       = normalised.code       ?? ERROR_CODES.INTERNAL_ERROR
  const message    = normalised.message    ?? 'Internal server error'
  const isOperational = normalised.isOperational === true

  // Log non-operational errors (bugs) with full stack
  if (!isOperational) {
    logger.error('Unhandled error', {
      error:     message,
      stack:     err.stack,
      requestId: req.id,
      method:    req.method,
      path:      req.path,
      ip:        req.ip,
    })
  }

  const details = normalised.details ?? undefined
  const responseBody = formatError(
    isProd && !isOperational ? 'An unexpected error occurred' : message,
    code,
    statusCode,
    !isProd ? details : undefined
  )

  res.status(statusCode).json(responseBody)
}

module.exports = errorHandler
