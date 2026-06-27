'use strict'

const { HTTP } = require('../constants/statusCodes')
const { ERROR_CODES } = require('../constants/errorCodes')

/**
 * Operational error with HTTP status and machine-readable code.
 * isOperational=true means the error handler will NOT log a stack trace
 * in production — these are expected client errors, not bugs.
 */
class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} [statusCode=500] - HTTP status code
   * @param {string} [code] - Machine-readable error code from ERROR_CODES
   */
  constructor(
    message,
    statusCode = HTTP.INTERNAL_SERVER_ERROR,
    code = ERROR_CODES.INTERNAL_ERROR,
    details = undefined
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }

  // ── Factory shortcuts ──────────────────────────────────────────────────────

  static notFound(resource = 'Resource') {
    return new AppError(`${resource} not found`, HTTP.NOT_FOUND, ERROR_CODES.NOT_FOUND)
  }

  static unauthorized(message = 'Unauthorized', code = ERROR_CODES.TOKEN_INVALID) {
    return new AppError(message, HTTP.UNAUTHORIZED, code)
  }

  static forbidden(message = 'Insufficient permissions') {
    return new AppError(message, HTTP.FORBIDDEN, ERROR_CODES.INSUFFICIENT_PERMISSIONS)
  }

  static badRequest(message, code = ERROR_CODES.VALIDATION_ERROR) {
    return new AppError(message, HTTP.BAD_REQUEST, code)
  }

  static conflict(message, code = ERROR_CODES.ALREADY_EXISTS) {
    return new AppError(message, HTTP.CONFLICT, code)
  }

  static tooManyRequests(message = 'Too many requests') {
    return new AppError(message, HTTP.TOO_MANY_REQUESTS, ERROR_CODES.RATE_LIMIT_EXCEEDED)
  }
}

module.exports = AppError
