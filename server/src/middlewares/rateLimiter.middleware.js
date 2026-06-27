'use strict'

const rateLimit = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis')
const { getRedisClient } = require('../config/redis')
const { LIMITS } = require('../constants/limits')
const { formatError } = require('../utils/formatResponse')
const { ERROR_CODES } = require('../constants/errorCodes')
const { HTTP } = require('../constants/statusCodes')

/**
 * Creates a rate limiter middleware backed by Redis when available.
 * Falls back to in-memory store if Redis is not connected.
 *
 * @param {{ windowMs: number, max: number, keyPrefix?: string }} options
 * @returns {import('express').RequestHandler}
 */
function createRateLimiter({ windowMs, max, keyPrefix = 'rl' }) {
  const client = getRedisClient()

  const store = client
    ? new RedisStore({
        // rate-limit-redis 4.x uses sendCommand adapter
        sendCommand: (...args) => client.call(...args),
        prefix: `macrospark:${keyPrefix}:`,
      })
    : undefined // falls back to MemoryStore

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    store,
    keyGenerator: (req) => req.ip,
    handler: (_req, res) => {
      res
        .status(HTTP.TOO_MANY_REQUESTS)
        .json(formatError('Too many requests', ERROR_CODES.RATE_LIMIT_EXCEEDED, HTTP.TOO_MANY_REQUESTS))
    },
    skip: (req) => req.ip === '127.0.0.1' && process.env.NODE_ENV === 'test',
  })
}

// Pre-built limiters — imported in app.js and route files
const globalLimiter  = createRateLimiter({ ...LIMITS.GLOBAL_RATE,         keyPrefix: 'global' })
const authLimiter    = createRateLimiter({ ...LIMITS.AUTH_RATE,            keyPrefix: 'auth' })
const passwordLimiter = createRateLimiter({ ...LIMITS.PASSWORD_RESET_RATE, keyPrefix: 'pwd' })
const newsletterLimiter = createRateLimiter({ ...LIMITS.NEWSLETTER_RATE,   keyPrefix: 'nl' })
const contactLimiter = createRateLimiter({ ...LIMITS.CONTACT_RATE,         keyPrefix: 'contact' })

module.exports = {
  createRateLimiter,
  globalLimiter,
  authLimiter,
  passwordLimiter,
  newsletterLimiter,
  contactLimiter,
}
