'use strict'

const { createLogger, format, transports } = require('winston')
const path = require('path')
const env = require('./env')

const { combine, timestamp, errors, json, colorize, printf } = format

// Dev-only: readable colorized console output
const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, requestId, ...meta }) => {
    const reqId = requestId ? ` [${requestId}]` : ''
    const extra = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''
    return `${ts} ${level}${reqId}: ${message}${extra}`
  })
)

// Production: structured JSON, parsed by log aggregators
const prodFormat = combine(timestamp(), errors({ stack: true }), json())

const logger = createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: env.NODE_ENV === 'production' ? prodFormat : devFormat,
  defaultMeta: { service: 'macrospark-api' },
  transports: [
    new transports.Console(),
    ...(env.NODE_ENV === 'production'
      ? [
          new transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
          }),
          new transports.File({
            filename: path.join('logs', 'combined.log'),
          }),
        ]
      : []),
  ],
  // Exceptions and rejections log before process exits
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
})

module.exports = logger
