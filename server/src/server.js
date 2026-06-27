'use strict'

// Load and validate env before anything else
require('./config/env')

const app = require('./app')
const env = require('./config/env')
const logger = require('./config/logger')
const { connectDatabase, closeDatabase } = require('./config/database')
const { getRedisClient, closeRedis } = require('./config/redis')

const FORCE_EXIT_TIMEOUT_MS = 30_000

async function startServer() {
  // Establish database connections before accepting traffic
  await connectDatabase()
  getRedisClient() // initialises singleton; errors are handled internally

  const server = app.listen(env.PORT, () => {
    logger.info(`MacroSpark API listening`, {
      port:    env.PORT,
      env:     env.NODE_ENV,
      pid:     process.pid,
    })
  })

  // ── Graceful shutdown ────────────────────────────────────────────────────────
  async function shutdown(signal) {
    logger.info(`${signal} received — initiating graceful shutdown`)

    // Force exit if shutdown takes longer than the timeout
    const forceExit = setTimeout(() => {
      logger.error('Graceful shutdown timed out — forcing exit')
      process.exit(1)
    }, FORCE_EXIT_TIMEOUT_MS)
    forceExit.unref()

    try {
      // 1. Stop accepting new connections
      await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
      logger.info('HTTP server closed')

      // 2. Close database connections
      await closeDatabase()

      // 3. Close Redis
      await closeRedis()

      logger.info('Shutdown complete')
      process.exit(0)
    } catch (err) {
      logger.error('Error during shutdown', { error: err.message })
      process.exit(1)
    }
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  // Unhandled rejections are logged; exceptions exit via Winston rejectionHandlers
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled promise rejection', { reason: String(reason) })
  })

  return server
}

startServer().catch((err) => {
  // Startup failure — log and exit with non-zero code
  console.error('Fatal startup error:', err)
  process.exit(1)
})
