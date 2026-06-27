'use strict'

const { z } = require('zod')

const subscribeSchema = z.object({
  email:     z.string().email('Invalid email').toLowerCase().trim(),
  firstName: z.string().trim().max(50).optional(),
  source:    z.enum(['footer', 'hero', 'article', 'report', 'popup', 'api']).optional(),
})

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
})

module.exports = { subscribeSchema, unsubscribeSchema }
