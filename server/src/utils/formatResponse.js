'use strict'

/**
 * Formats a successful API response envelope.
 *
 * @param {*} data
 * @param {string} [message]
 * @returns {{ success: true, data: *, message?: string }}
 */
function formatSuccess(data, message) {
  const response = { success: true, data }
  if (message) response.message = message
  return response
}

/**
 * Formats a paginated list response envelope.
 *
 * @param {Array} items
 * @param {{ page: number, limit: number, total: number }} pagination
 * @returns {{ success: true, data: { items: Array, pagination: object } }}
 */
function formatPaginated(items, { page, limit, total }) {
  return {
    success: true,
    data: {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    },
  }
}

/**
 * Formats an error response envelope.
 * Stack trace is stripped in production.
 *
 * @param {string} message
 * @param {string} code
 * @param {number} statusCode
 * @param {object} [details] - Validation error details (field-level errors)
 * @returns {{ success: false, error: object }}
 */
function formatError(message, code, statusCode, details) {
  const error = { message, code, statusCode }
  if (details) error.details = details
  if (process.env.NODE_ENV !== 'production' && details?.stack) {
    error.stack = details.stack
  }
  return { success: false, error }
}

module.exports = { formatSuccess, formatPaginated, formatError }
