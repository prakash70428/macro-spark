'use strict'

const { Router } = require('express')
const {
  listReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/reports.controller')
const validate = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/authenticate.middleware')
const authorize = require('../middlewares/authorize.middleware')
const { listQuerySchema } = require('../validators/research.validator')
const { ROLES, EDITORIAL_ROLES } = require('../constants/roles')

const router = Router()

// ── Public (content gated inside controller) ──────────────────────────────────

// GET /reports — optional auth to unlock gated content in response
router.get('/', authenticate({ optional: true }), validate(listQuerySchema, 'query'), listReports)
router.get('/:slug', authenticate({ optional: true }), getReport)

// ── Protected ─────────────────────────────────────────────────────────────────

router.post('/', authenticate(), authorize(...EDITORIAL_ROLES), createReport)

router.patch('/:slug', authenticate(), authorize(...EDITORIAL_ROLES), updateReport)

router.delete('/:slug', authenticate(), authorize(ROLES.ADMIN), deleteReport)

module.exports = router
