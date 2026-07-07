'use strict'

const { z } = require('zod')

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').toLowerCase().trim(),
  subject: z.string().trim().min(1, 'Subject is required').max(150),
  message: z.string().trim().min(10, 'Message too short').max(3000),
})

module.exports = { contactSchema }
