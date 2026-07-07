'use strict'

const mongoose = require('mongoose')
const { createSchema } = require('./base')

const ArticleSchema = createSchema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 400,
  },
  // Rich text body — stored as JSON (Portable Text / Sanity blocks)
  body: { type: mongoose.Schema.Types.Mixed },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  category: {
    type: String,
    // Aligned with frontend CATEGORIES in src/lib/research.js
    enum: [
      'monetary-policy',
      'markets',
      'economics',
      'fixed-income',
      'equities',
      'commodities',
      'fx',
      'crypto',
      'emerging-markets',
    ],
    index: true,
  },
  contentType: {
    type: String,
    enum: ['analysis', 'data-story', 'interview', 'opinion', 'brief'],
    index: true,
  },
  tag: { type: String, trim: true },
  readTime: { type: Number, default: 5 }, // minutes

  status: {
    type: String,
    enum: ['draft', 'review', 'published', 'archived'],
    default: 'draft',
    index: true,
  },
  publishedAt: { type: Date, index: true },
  featuredImage: { type: String }, // URL
  isPremium: { type: Boolean, default: false, index: true },
})

// Text index for search
ArticleSchema.index({ title: 'text', excerpt: 'text', tag: 'text' })

// Only show published articles by default
ArticleSchema.index({ status: 1, publishedAt: -1 })

module.exports = mongoose.model('Article', ArticleSchema)
