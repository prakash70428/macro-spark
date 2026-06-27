'use strict'

const Redis = require('ioredis')
const env = require('./env')
const logger = require('./logger')

let redisClient = null

/**
 * Returns the singleton Redis client.
 * In development with no REDIS_URL, returns null and the caller falls back to memory.
 *
 * @returns {Redis | null}
 */
function getRedisClient() {
  if (redisClient) return redisClient

  if (!env.REDIS_URL) {
    logger.warn('REDIS_URL not set — rate limiting will use in-memory store')
    return null
  }

  try {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    })

    redisClient.on('connect', () => {
      logger.info('Redis connected')
    })

    redisClient.on('error', (err) => {
      logger.error('Redis error', { error: err.message })
    })

    redisClient.on('close', () => {
      logger.warn('Redis connection closed')
    })

    return redisClient
  } catch (err) {
    logger.warn('Redis unavailable — rate limiting and token denylist will use memory', {
      error: err.message,
    })
    return null
  }
}

/**
 * Gracefully closes the Redis connection.
 * Called during SIGTERM shutdown sequence.
 *
 * @returns {Promise<void>}
 */
async function closeRedis() {
  if (redisClient) {
    await redisClient.quit()
    logger.info('Redis connection closed')
    redisClient = null
  }
}

module.exports = { getRedisClient, closeRedis }
