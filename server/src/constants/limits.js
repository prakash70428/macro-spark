'use strict'

// Rate limit windows in milliseconds
const WINDOW_15_MIN = 15 * 60 * 1000
const WINDOW_1_HOUR = 60 * 60 * 1000

const LIMITS = Object.freeze({
  // Global limiter — applied to all /api routes
  GLOBAL_RATE: {
    windowMs: WINDOW_15_MIN,
    max: 300,
  },

  // Auth endpoints — stricter to prevent brute force
  AUTH_RATE: {
    windowMs: WINDOW_15_MIN,
    max: 20,
  },

  // Forgot-password endpoint
  PASSWORD_RESET_RATE: {
    windowMs: WINDOW_1_HOUR,
    max: 5,
  },

  // Newsletter subscription
  NEWSLETTER_RATE: {
    windowMs: WINDOW_1_HOUR,
    max: 3,
  },

  // Contact form
  CONTACT_RATE: {
    windowMs: WINDOW_1_HOUR,
    max: 5,
  },

  // Body parser size limits
  JSON_BODY_LIMIT: '10kb',
  URLENCODED_BODY_LIMIT: '10kb',

  // Auth brute-force lockout after N failed logins
  MAX_FAILED_LOGINS: 5,
  LOCKOUT_DURATION_MS: 30 * 60 * 1000, // 30 minutes
})

module.exports = { LIMITS, WINDOW_15_MIN, WINDOW_1_HOUR }
