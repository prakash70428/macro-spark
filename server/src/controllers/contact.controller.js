'use strict'

const Contact = require('../models/Contact')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const { formatSuccess } = require('../utils/formatResponse')
const logger = require('../config/logger')

/**
 * POST /contact
 * Saves the message and triggers a confirmation email (Resend, future sprint).
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    user: req.user?.id || null,
  })

  logger.info(`Contact form submission from ${email} — subject: "${subject}"`)

  // TODO: send confirmation email via Resend (Sprint 6)

  res
    .status(201)
    .json(
      formatSuccess(
        { id: contact.id },
        "Message received. We'll be in touch within 2 business days."
      )
    )
})

/**
 * GET /contact  [admin only]
 * Lists all contact submissions, newest first.
 */
const listContacts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const status = req.query.status || null
  const skip = (page - 1) * limit

  const filter = status ? { status } : {}

  const [items, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(filter),
  ])

  res.json({
    success: true,
    data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
  })
})

/**
 * PATCH /contact/:id/status  [admin only]
 * Update read/replied/spam status.
 */
const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  const VALID = ['new', 'read', 'replied', 'spam']
  if (!VALID.includes(status))
    throw AppError.badRequest(`Status must be one of: ${VALID.join(', ')}`)

  const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true })
  if (!contact) throw AppError.notFound('Contact submission')

  res.json(formatSuccess(contact, 'Status updated'))
})

module.exports = { submitContact, listContacts, updateContactStatus }
