'use strict'

/**
 * Wraps an async Express route handler to forward errors to next().
 * Eliminates the need for try/catch in every controller.
 *
 * @param {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<any>} fn
 * @returns {import('express').RequestHandler}
 *
 * @example
 * router.get('/users/:id', asyncHandler(async (req, res) => {
 *   const user = await UserService.findById(req.params.id)
 *   res.json(formatSuccess(user))
 * }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
