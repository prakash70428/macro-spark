'use strict'

const Article = require('../models/Article')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const { formatSuccess, formatPaginated } = require('../utils/formatResponse')

// ── Reusable query builder ────────────────────────────────────────────────────

function buildArticleQuery({ q, category, type, status = 'published' }) {
  const filter = { status }
  if (category && category !== 'all') filter.category = category
  if (type && type !== 'all') filter.contentType = type
  if (q) filter.$text = { $search: q }
  return filter
}

function sortOption(sort) {
  if (sort === 'oldest') return { publishedAt: 1 }
  return { publishedAt: -1 } // 'latest' default
}

// ── Public — article list ─────────────────────────────────────────────────────

/**
 * GET /research
 * Query: q, category, type, sort, page, limit
 */
const listArticles = asyncHandler(async (req, res) => {
  const { q, category, type, sort, page, limit } = req.query

  const filter = buildArticleQuery({ q, category, type })
  const skip = (page - 1) * limit

  const [items, total] = await Promise.all([
    Article.find(filter)
      .sort(sortOption(sort))
      .skip(skip)
      .limit(limit)
      .populate('author', 'firstName lastName')
      .lean(),
    Article.countDocuments(filter),
  ])

  res.json(formatPaginated(items, { page, limit, total }))
})

/**
 * GET /research/:slug
 * Accessible to all (premium check can be layered later).
 */
const getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug, status: 'published' })
    .populate('author', 'firstName lastName')
    .lean()

  if (!article) throw AppError.notFound('Article')

  // Related — same category, exclude self
  const related = await Article.find({
    category: article.category,
    status: 'published',
    _id: { $ne: article._id },
  })
    .sort({ publishedAt: -1 })
    .limit(4)
    .select('title slug excerpt category tag readTime publishedAt author')
    .populate('author', 'firstName lastName')
    .lean()

  res.json(formatSuccess({ article, related }))
})

// ── Admin — create / update / delete ─────────────────────────────────────────

/**
 * POST /research  [admin, editor, analyst]
 */
const createArticle = asyncHandler(async (req, res) => {
  const article = await Article.create({ ...req.body, author: req.user.id })
  res.status(201).json(formatSuccess(article, 'Article created'))
})

/**
 * PATCH /research/:slug  [admin, editor, analyst]
 */
const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!article) throw AppError.notFound('Article')
  res.json(formatSuccess(article, 'Article updated'))
})

/**
 * DELETE /research/:slug  [admin]
 */
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findOneAndDelete({ slug: req.params.slug })
  if (!article) throw AppError.notFound('Article')
  res.json(formatSuccess(null, 'Article deleted'))
})

module.exports = { listArticles, getArticle, createArticle, updateArticle, deleteArticle }
