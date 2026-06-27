'use strict'

const mongoSanitize = require('express-mongo-sanitize')
const xss    = require('xss')
const logger = require('../config/logger')

/**
 * Strips MongoDB operator keys ($, .) from req.body, req.params, req.query.
 * Prevents NoSQL injection attacks.
 */
const mongoSanitizeMiddleware = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    // Logged by the error handler if needed; don't block the request
    logger.warn('MongoDB operator stripped from request', {
      key,
      requestId: req.id,
      path: req.path,
    })
  },
})

/**
 * Recursively sanitizes a value against XSS.
 * xss-clean is deprecated — using the `xss` package directly.
 *
 * @param {*} value
 * @returns {*}
 */
function sanitizeValue(value) {
  if (typeof value === 'string') return xss(value)
  if (Array.isArray(value)) return value.map(sanitizeValue)
  if (value !== null && typeof value === 'object') {
    const sanitized = {}
    for (const [k, v] of Object.entries(value)) {
      sanitized[k] = sanitizeValue(v)
    }
    return sanitized
  }
  return value
}

/**
 * Applies XSS sanitization to req.body, req.query, and req.params.
 *
 * @type {import('express').RequestHandler}
 */
function xssSanitizeMiddleware(req, _res, next) {
  if (req.body)   req.body   = sanitizeValue(req.body)
  if (req.query)  req.query  = sanitizeValue(req.query)
  if (req.params) req.params = sanitizeValue(req.params)
  next()
}

module.exports = { mongoSanitizeMiddleware, xssSanitizeMiddleware }
