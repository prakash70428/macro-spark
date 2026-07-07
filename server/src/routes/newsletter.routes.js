'use strict'

const { Router } = require('express')
const { subscribe, unsubscribe, listSubscribers } = require('../controllers/newsletter.controller')
const validate = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/authenticate.middleware')
const authorize = require('../middlewares/authorize.middleware')
const { newsletterLimiter } = require('../middlewares/rateLimiter.middleware')
const { subscribeSchema, unsubscribeSchema } = require('../validators/newsletter.validator')
const { ROLES } = require('../constants/roles')

const router = Router()

// POST /newsletter/subscribe
router.post('/subscribe', newsletterLimiter, validate(subscribeSchema), subscribe)

// POST /newsletter/unsubscribe
router.post('/unsubscribe', newsletterLimiter, validate(unsubscribeSchema), unsubscribe)

// GET /newsletter/subscribers — admin only
router.get('/subscribers', authenticate(), authorize(ROLES.ADMIN), listSubscribers)

module.exports = router
