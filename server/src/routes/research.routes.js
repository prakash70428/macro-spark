'use strict'

const { Router } = require('express')
const {
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/research.controller')
const validate     = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/authenticate.middleware')
const authorize    = require('../middlewares/authorize.middleware')
const { listQuerySchema } = require('../validators/research.validator')
const { ROLES, EDITORIAL_ROLES } = require('../constants/roles')

const router = Router()

// ── Public routes ─────────────────────────────────────────────────────────────

// GET /research
router.get('/', validate(listQuerySchema, 'query'), listArticles)

// GET /research/:slug
router.get('/:slug', getArticle)

// ── Protected routes — editorial team only ────────────────────────────────────

// POST /research
router.post(
  '/',
  authenticate(),
  authorize(...EDITORIAL_ROLES),
  createArticle
)

// PATCH /research/:slug
router.patch(
  '/:slug',
  authenticate(),
  authorize(...EDITORIAL_ROLES),
  updateArticle
)

// DELETE /research/:slug  — admin only
router.delete(
  '/:slug',
  authenticate(),
  authorize(ROLES.ADMIN),
  deleteArticle
)

module.exports = router
