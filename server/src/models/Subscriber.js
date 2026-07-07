'use strict'

const mongoose = require('mongoose')
const { createSchema } = require('./base')

const SubscriberSchema = createSchema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  firstName: { type: String, trim: true, maxlength: 50 },

  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active',
    index: true,
  },

  // Where did they subscribe from
  source: {
    type: String,
    enum: ['footer', 'hero', 'article', 'report', 'popup', 'api'],
    default: 'api',
  },

  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date, default: null },

  // Optional: link to user account
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true,
  },
})

module.exports = mongoose.model('Subscriber', SubscriberSchema)
