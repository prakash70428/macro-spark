'use strict'

const Subscriber   = require('../models/Subscriber')
const AppError     = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const { formatSuccess } = require('../utils/formatResponse')
const logger       = require('../config/logger')

/**
 * POST /newsletter/subscribe
 */
const subscribe = asyncHandler(async (req, res) => {
  const { email, firstName, source } = req.body

  const existing = await Subscriber.findOne({ email })

  if (existing) {
    if (existing.status === 'active') {
      // Idempotent — don't error, just confirm
      return res.json(formatSuccess({ email }, 'Already subscribed'))
    }
    // Re-subscribe
    existing.status         = 'active'
    existing.subscribedAt   = new Date()
    existing.unsubscribedAt = null
    if (firstName) existing.firstName = firstName
    await existing.save()
    return res.json(formatSuccess({ email }, 'Welcome back! Subscription reactivated.'))
  }

  await Subscriber.create({ email, firstName, source: source || 'api' })

  logger.info(`Newsletter subscription: ${email}`)

  res.status(201).json(formatSuccess({ email }, 'Subscribed successfully'))
})

/**
 * POST /newsletter/unsubscribe
 */
const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body

  const subscriber = await Subscriber.findOne({ email })
  if (!subscriber || subscriber.status !== 'active') {
    return res.json(formatSuccess(null, 'Already unsubscribed or not found'))
  }

  subscriber.status         = 'unsubscribed'
  subscriber.unsubscribedAt = new Date()
  await subscriber.save()

  logger.info(`Newsletter unsubscription: ${email}`)

  res.json(formatSuccess(null, 'Unsubscribed successfully'))
})

/**
 * GET /newsletter/subscribers  [admin only]
 */
const listSubscribers = asyncHandler(async (req, res) => {
  const page  = Number(req.query.page)  || 1
  const limit = Number(req.query.limit) || 50
  const skip  = (page - 1) * limit

  const [items, total] = await Promise.all([
    Subscriber.find({ status: 'active' }).sort({ subscribedAt: -1 }).skip(skip).limit(limit).lean(),
    Subscriber.countDocuments({ status: 'active' }),
  ])

  res.json({
    success: true,
    data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
  })
})

module.exports = { subscribe, unsubscribe, listSubscribers }
