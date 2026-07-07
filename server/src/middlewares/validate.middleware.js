'use strict'

const { ZodError } = require('zod')
const AppError = require('../utils/AppError')
const { formatError } = require('../utils/formatResponse')
const { HTTP } = require('../constants/statusCodes')
const { ERROR_CODES } = require('../constants/errorCodes')

/**
 * Validates req.body, req.query, or req.params against a Zod schema.
 * On success: replaces the source with the parsed (coerced/trimmed) data.
 * On failure: responds 422 with field-level error details.
 *
 * @param {import('zod').ZodTypeAny} schema
 * @param {'body'|'query'|'params'} [source='body']
 * @returns {import('express').RequestHandler}
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return res
        .status(HTTP.UNPROCESSABLE_ENTITY)
        .json(
          formatError(
            'Validation failed',
            ERROR_CODES.VALIDATION_ERROR,
            HTTP.UNPROCESSABLE_ENTITY,
            details
          )
        )
    }

    // Replace with parsed data so controllers get coerced/trimmed values
    req[source] = result.data
    next()
  }
}

module.exports = validate
