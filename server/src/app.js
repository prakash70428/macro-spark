'use strict'

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')

const env = require('./config/env')
const logger = require('./config/logger')
const routes = require('./routes/index')
const {
  mongoSanitizeMiddleware,
  xssSanitizeMiddleware,
} = require('./middlewares/sanitize.middleware')
const requestIdMiddleware = require('./middlewares/requestId.middleware')
const { globalLimiter } = require('./middlewares/rateLimiter.middleware')
const errorHandler = require('./middlewares/errorHandler.middleware')
const { formatError } = require('./utils/formatResponse')
const { HTTP } = require('./constants/statusCodes')
const { ERROR_CODES } = require('./constants/errorCodes')
const { LIMITS } = require('./constants/limits')

const app = express()

// ── 1. Trust proxy ─────────────────────────────────────────────────────────────
// Required to get correct req.ip behind Railway/Render/Vercel proxies
app.set('trust proxy', 1)

// ── 2. Request ID ──────────────────────────────────────────────────────────────
app.use(requestIdMiddleware)

// ── 3. HTTP request logger (Morgan → Winston) ─────────────────────────────────
const morganFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev'
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.http(message.trim(), { requestId: undefined }),
    },
    skip: (_req, res) => res.statusCode < 400 && env.NODE_ENV === 'production',
  })
)

// ── 4. Helmet (security headers) ──────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: false,
  })
)

// ── 5. CORS ────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true) // allow server-to-server (no origin)
      if (env.ALLOWED_ORIGINS.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  })
)

// ── 6. Body parsers ────────────────────────────────────────────────────────────
app.use(express.json({ limit: LIMITS.JSON_BODY_LIMIT }))
app.use(express.urlencoded({ extended: true, limit: LIMITS.URLENCODED_BODY_LIMIT }))

// ── 7. MongoDB sanitization ───────────────────────────────────────────────────
app.use(mongoSanitizeMiddleware)

// ── 8. XSS sanitization ───────────────────────────────────────────────────────
// xss-clean is deprecated — using xss package directly
app.use(xssSanitizeMiddleware)

// ── 9. Compression ────────────────────────────────────────────────────────────
app.use(compression())

// ── 10. Global rate limiter ────────────────────────────────────────────────────
app.use('/api', globalLimiter)

// ── 11. Routes ────────────────────────────────────────────────────────────────
app.use('/api', routes)

// ── 12. 404 handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res
    .status(HTTP.NOT_FOUND)
    .json(formatError('Route not found', ERROR_CODES.NOT_FOUND, HTTP.NOT_FOUND))
})

// ── 13. Global error handler (MUST be last) ────────────────────────────────────
app.use(errorHandler)

module.exports = app
