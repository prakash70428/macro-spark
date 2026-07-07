'use strict'

const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const { getPublicKey } = require('../config/keys')
const { ERROR_CODES } = require('../constants/errorCodes')

/**
 * Verifies the Bearer access token in `Authorization` header.
 * Sets `req.user = { id, email, role }` on success.
 *
 * @param {{ optional?: boolean }} [opts]
 *   optional=true → skips authentication if no token present (for public endpoints
 *   that return richer data when logged in)
 */
function authenticate({ optional = false } = {}) {
  return (req, _res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) {
      if (optional) return next()
      return next(AppError.unauthorized('No access token provided', ERROR_CODES.TOKEN_INVALID))
    }

    try {
      const payload = jwt.verify(token, getPublicKey(), { algorithms: ['RS256'] })
      req.user = { id: payload.sub, email: payload.email, role: payload.role }
      next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(AppError.unauthorized('Access token expired', ERROR_CODES.TOKEN_EXPIRED))
      }
      return next(AppError.unauthorized('Invalid access token', ERROR_CODES.TOKEN_INVALID))
    }
  }
}

module.exports = authenticate
