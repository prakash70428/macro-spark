'use strict'

const { Router } = require('express')
const {
  submitContact,
  listContacts,
  updateContactStatus,
} = require('../controllers/contact.controller')
const validate = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/authenticate.middleware')
const authorize = require('../middlewares/authorize.middleware')
const { contactLimiter } = require('../middlewares/rateLimiter.middleware')
const { contactSchema } = require('../validators/contact.validator')
const { ROLES } = require('../constants/roles')

const router = Router()

// POST /contact — public with rate limiting, optional auth to tag logged-in users
router.post(
  '/',
  contactLimiter,
  authenticate({ optional: true }),
  validate(contactSchema),
  submitContact
)

// GET /contact  [admin]
router.get('/', authenticate(), authorize(ROLES.ADMIN), listContacts)

// PATCH /contact/:id/status  [admin]
router.patch('/:id/status', authenticate(), authorize(ROLES.ADMIN), updateContactStatus)

module.exports = router
