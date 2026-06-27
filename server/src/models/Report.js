'use strict'

const mongoose = require('mongoose')
const { createSchema } = require('./base')

const ReportSchema = createSchema({
  title: {
    type:      String,
    required:  true,
    trim:      true,
    maxlength: 200,
  },
  slug: {
    type:      String,
    required:  true,
    unique:    true,
    lowercase: true,
    trim:      true,
    index:     true,
  },
  excerpt: {
    type:      String,
    required:  true,
    maxlength: 500,
  },
  body: { type: mongoose.Schema.Types.Mixed },

  author: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    index:    true,
  },

  category: {
    type:  String,
    enum:  ['macro', 'equity', 'credit', 'fx', 'commodities', 'alternatives', 'thematic'],
    index: true,
  },

  // Access tiers
  accessLevel: {
    type:    String,
    enum:    ['free', 'subscriber', 'premium'],
    default: 'subscriber',
    index:   true,
  },

  status: {
    type:    String,
    enum:    ['draft', 'review', 'published', 'archived'],
    default: 'draft',
    index:   true,
  },
  publishedAt:   { type: Date, index: true },
  featuredImage: { type: String },
  pdfUrl:        { type: String }, // downloadable PDF for premium
  pageCount:     { type: Number },
  tags:          [{ type: String }],
})

ReportSchema.index({ title: 'text', excerpt: 'text' })
ReportSchema.index({ status: 1, publishedAt: -1 })

module.exports = mongoose.model('Report', ReportSchema)
