'use strict'

const mongoose = require('mongoose')
const env = require('./env')
const logger = require('./logger')

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 5000

mongoose.set('strictQuery', true)

// Log Mongoose-level events via Winston
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected', { host: mongoose.connection.host })
})

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error', { error: err.message })
})

/**
 * Connects to MongoDB with exponential backoff retry.
 * Exits the process after MAX_RETRIES failed attempts.
 *
 * @param {number} [attempt=1]
 * @returns {Promise<void>}
 */
async function connectDatabase(attempt = 1) {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
  } catch (err) {
    logger.error(`MongoDB connection attempt ${attempt} failed`, {
      error: err.message,
    })

    if (attempt >= MAX_RETRIES) {
      logger.error('MongoDB: max retries exceeded. Exiting.')
      process.exit(1)
    }

    const delay = RETRY_DELAY_MS * attempt
    logger.info(`Retrying MongoDB connection in ${delay / 1000}s…`)
    await new Promise((resolve) => setTimeout(resolve, delay))
    return connectDatabase(attempt + 1)
  }
}

/**
 * Gracefully closes the MongoDB connection.
 * Called during SIGTERM shutdown sequence.
 *
 * @returns {Promise<void>}
 */
async function closeDatabase() {
  await mongoose.connection.close()
  logger.info('MongoDB connection closed')
}

module.exports = { connectDatabase, closeDatabase }
