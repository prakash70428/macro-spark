'use strict'

const Report       = require('../models/Report')
const AppError     = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const { formatSuccess, formatPaginated } = require('../utils/formatResponse')
const { ROLES, SUBSCRIBER_ROLES } = require('../constants/roles')

// ── Access level enforcement ──────────────────────────────────────────────────

function canAccessReport(report, user) {
  if (report.accessLevel === 'free') return true
  if (!user) return false
  if (report.accessLevel === 'subscriber') return SUBSCRIBER_ROLES.includes(user.role)
  if (report.accessLevel === 'premium')    return [ROLES.ADMIN, ROLES.EDITOR, ROLES.ANALYST].includes(user.role)
  return false
}

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * GET /reports
 * Query: category, sort, page, limit
 * Gated body returned only if user has access.
 */
const listReports = asyncHandler(async (req, res) => {
  const { category, sort, page, limit } = req.query
  const filter = { status: 'published' }
  if (category && category !== 'all') filter.category = category

  const sortOpt = sort === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 }
  const skip    = (page - 1) * limit

  const [items, total] = await Promise.all([
    Report.find(filter)
      .sort(sortOpt)
      .skip(skip)
      .limit(limit)
      .select('-body')           // exclude body in list view
      .populate('author', 'firstName lastName')
      .lean(),
    Report.countDocuments(filter),
  ])

  // Tag each item with whether the current user can download
  const enriched = items.map((r) => ({
    ...r,
    canAccess: canAccessReport(r, req.user),
  }))

  res.json(formatPaginated(enriched, { page, limit, total }))
})

/**
 * GET /reports/:slug
 * Body/PDF only returned when user has access.
 */
const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ slug: req.params.slug, status: 'published' })
    .populate('author', 'firstName lastName')
    .lean()

  if (!report) throw AppError.notFound('Report')

  const accessible = canAccessReport(report, req.user)

  // Strip premium content if user doesn't have access
  const responseReport = accessible
    ? report
    : { ...report, body: null, pdfUrl: null }

  res.json(formatSuccess({ report: responseReport, canAccess: accessible }))
})

/**
 * POST /reports  [admin, editor, analyst]
 */
const createReport = asyncHandler(async (req, res) => {
  const report = await Report.create({ ...req.body, author: req.user.id })
  res.status(201).json(formatSuccess(report, 'Report created'))
})

/**
 * PATCH /reports/:slug  [admin, editor, analyst]
 */
const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true }
  )
  if (!report) throw AppError.notFound('Report')
  res.json(formatSuccess(report, 'Report updated'))
})

/**
 * DELETE /reports/:slug  [admin]
 */
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndDelete({ slug: req.params.slug })
  if (!report) throw AppError.notFound('Report')
  res.json(formatSuccess(null, 'Report deleted'))
})

module.exports = { listReports, getReport, createReport, updateReport, deleteReport }
