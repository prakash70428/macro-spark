'use strict'

const { Router } = require('express')
const { register, login, refresh, logout, me, forgotPassword, resetPassword } = require('../controllers/auth.controller')
const validate       = require('../middlewares/validate.middleware')
const authenticate   = require('../middlewares/authenticate.middleware')
const { authLimiter, passwordLimiter } = require('../middlewares/rateLimiter.middleware')
const { registerSchema, loginSchema, refreshSchema } = require('../validators/auth.validator')

const router = Router()

// Apply auth rate limiter to all auth routes
router.use(authLimiter)

// POST /auth/register
router.post('/register', validate(registerSchema), register)

// POST /auth/login
router.post('/login', validate(loginSchema), login)

// POST /auth/refresh — accepts token from HttpOnly cookie or body
router.post('/refresh', refresh)

// POST /auth/logout
router.post('/logout', logout)

// GET /auth/me — requires valid access token
router.get('/me', authenticate(), me)

// POST /auth/forgot-password
router.post('/forgot-password', passwordLimiter, forgotPassword)

// POST /auth/reset-password
router.post('/reset-password', resetPassword)

module.exports = router
