'use strict'

const { Router } = require('express')
const { formatSuccess } = require('../utils/formatResponse')

const authRoutes       = require('./auth.routes')
const researchRoutes   = require('./research.routes')
const reportsRoutes    = require('./reports.routes')
const newsletterRoutes = require('./newsletter.routes')
const contactRoutes    = require('./contact.routes')

const router = Router()

// ── Health check ──────────────────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json(
    formatSuccess({
      status:    'ok',
      timestamp: new Date().toISOString(),
      uptime:    Math.floor(process.uptime()),
      env:       process.env.NODE_ENV,
    })
  )
})

// ── API routes ────────────────────────────────────────────────────────────────
router.use('/auth',       authRoutes)
router.use('/research',   researchRoutes)
router.use('/reports',    reportsRoutes)
router.use('/newsletter', newsletterRoutes)
router.use('/contact',    contactRoutes)

module.exports = router
