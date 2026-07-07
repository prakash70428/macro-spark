'use strict'

const mongoose = require('mongoose')
const { createSchema } = require('./base')

const ContactSchema = createSchema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  subject: { type: String, required: true, trim: true, maxlength: 150 },
  message: { type: String, required: true, maxlength: 3000 },

  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'spam'],
    default: 'new',
    index: true,
  },

  ip: { type: String },
  userAgent: { type: String },

  // If the submitter was logged in
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
})

module.exports = mongoose.model('Contact', ContactSchema)
