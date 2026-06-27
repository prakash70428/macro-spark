'use strict'

const { v4: uuidv4 } = require('uuid')

/**
 * Injects a unique request ID into req.id and the response header.
 * Placed before the Morgan logger so the ID is available in log lines.
 * Accepts X-Request-ID from upstream proxies (e.g. load balancers).
 *
 * @type {import('express').RequestHandler}
 */
function requestIdMiddleware(req, res, next) {
  const id = req.headers['x-request-id'] || uuidv4()
  req.id = id
  res.setHeader('X-Request-ID', id)
  next()
}

module.exports = requestIdMiddleware
