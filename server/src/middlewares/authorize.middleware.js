'use strict'

const AppError = require('../utils/AppError')

/**
 * Role-based authorization guard.
 * Must be used AFTER `authenticate()` middleware.
 *
 * @param {...string} allowedRoles - Roles that may access this route
 * @returns {import('express').RequestHandler}
 *
 * @example
 * router.delete('/articles/:id',
 *   authenticate(),
 *   authorize('admin', 'editor'),
 *   deleteArticle
 * )
 */
function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(AppError.unauthorized())
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(AppError.forbidden(`Requires one of roles: ${allowedRoles.join(', ')}`))
    }

    next()
  }
}

module.exports = authorize
