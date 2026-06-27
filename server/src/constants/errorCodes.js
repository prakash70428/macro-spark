'use strict'

// Machine-readable error codes. Included in every error response body.
// Frontend uses these for i18n error messages and conditional UX logic.
const ERROR_CODES = Object.freeze({
  // Auth
  INVALID_CREDENTIALS:    'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED:         'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED:     'EMAIL_NOT_VERIFIED',
  TOKEN_EXPIRED:          'TOKEN_EXPIRED',
  TOKEN_INVALID:          'TOKEN_INVALID',
  TOKEN_REVOKED:          'TOKEN_REVOKED',
  REFRESH_TOKEN_INVALID:  'REFRESH_TOKEN_INVALID',

  // Resource
  NOT_FOUND:              'NOT_FOUND',
  ALREADY_EXISTS:         'ALREADY_EXISTS',
  VALIDATION_ERROR:       'VALIDATION_ERROR',

  // Rate limiting
  RATE_LIMIT_EXCEEDED:    'RATE_LIMIT_EXCEEDED',

  // Authorization
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // Server
  INTERNAL_ERROR:         'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE:    'SERVICE_UNAVAILABLE',
})

module.exports = { ERROR_CODES }
