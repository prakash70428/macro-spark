'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const { formatSuccess } = require('../utils/formatResponse')
const { getPrivateKey, getPublicKey } = require('../config/keys')
const env = require('../config/env')
const { HTTP } = require('../constants/statusCodes')
const { ERROR_CODES } = require('../constants/errorCodes')

// ── Token helpers ─────────────────────────────────────────────────────────────

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn: env.JWT_ACCESS_EXPIRY,
  })
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user.id }, getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn: env.JWT_REFRESH_EXPIRY,
  })
}

function cookieOpts(maxAgeMs) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAgeMs,
    path: '/',
  }
}

const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * POST /auth/register
 * Creates a new user account and returns tokens.
 */
const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const existing = await User.findOne({ email })
  if (existing) throw AppError.conflict('An account with this email already exists')

  const user = await User.create({ email, password, firstName, lastName })

  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)

  // Persist refresh token on user doc
  await User.findByIdAndUpdate(user._id, { $push: { refreshTokens: refreshToken } })

  res.cookie('refreshToken', refreshToken, cookieOpts(REFRESH_MAX_AGE_MS))

  res
    .status(HTTP.CREATED)
    .json(
      formatSuccess(
        {
          accessToken,
          user: { id: user.id, email: user.email, role: user.role, firstName, lastName },
        },
        'Account created successfully'
      )
    )
})

/**
 * POST /auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // +password to override select:false
  const user = await User.findOne({ email }).select(
    '+password +loginAttempts +lockUntil +refreshTokens'
  )
  if (!user)
    throw AppError.unauthorized('Invalid email or password', ERROR_CODES.INVALID_CREDENTIALS)

  if (user.isLocked()) {
    throw new AppError(
      'Account locked. Try again in 30 minutes.',
      HTTP.UNAUTHORIZED,
      ERROR_CODES.ACCOUNT_LOCKED
    )
  }

  const valid = await user.comparePassword(password)
  if (!valid) {
    await user.incLoginAttempts()
    throw AppError.unauthorized('Invalid email or password', ERROR_CODES.INVALID_CREDENTIALS)
  }

  // Reset failed attempts on successful login
  if (user.loginAttempts > 0) {
    await User.findByIdAndUpdate(user._id, {
      $set: { loginAttempts: 0, lockUntil: null },
    })
  }

  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)
  await User.findByIdAndUpdate(user._id, { $push: { refreshTokens: refreshToken } })

  res.cookie('refreshToken', refreshToken, cookieOpts(REFRESH_MAX_AGE_MS))

  res.json(
    formatSuccess({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  )
})

/**
 * POST /auth/refresh
 * Accepts refresh token from HttpOnly cookie OR request body.
 * Implements refresh token rotation: old token revoked, new issued.
 */
const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken
  if (!token)
    throw AppError.unauthorized('Refresh token required', ERROR_CODES.REFRESH_TOKEN_INVALID)

  let payload
  try {
    payload = jwt.verify(token, getPublicKey(), { algorithms: ['RS256'] })
  } catch {
    throw AppError.unauthorized('Invalid refresh token', ERROR_CODES.REFRESH_TOKEN_INVALID)
  }

  const user = await User.findById(payload.sub).select('+refreshTokens')
  if (!user || !user.refreshTokens.includes(token)) {
    // Possible token reuse — revoke all tokens
    if (user) await User.findByIdAndUpdate(user._id, { $set: { refreshTokens: [] } })
    throw AppError.unauthorized('Refresh token revoked', ERROR_CODES.TOKEN_REVOKED)
  }

  // Rotate: remove old, add new
  const newRefreshToken = signRefreshToken(user)
  await User.findByIdAndUpdate(user._id, {
    $pull: { refreshTokens: token },
    $push: { refreshTokens: newRefreshToken },
  })

  res.cookie('refreshToken', newRefreshToken, cookieOpts(REFRESH_MAX_AGE_MS))

  res.json(formatSuccess({ accessToken: signAccessToken(user) }))
})

/**
 * POST /auth/logout
 * Revokes the current refresh token.
 */
const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken
  if (token) {
    // Remove this specific refresh token
    await User.findOneAndUpdate({ refreshTokens: token }, { $pull: { refreshTokens: token } })
  }

  res.clearCookie('refreshToken', cookieOpts(0))
  res.json(formatSuccess(null, 'Logged out successfully'))
})

/**
 * GET /auth/me
 * Returns the currently authenticated user.
 */
const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw AppError.notFound('User')
  res.json(formatSuccess(user))
})

/**
 * POST /auth/forgot-password
 * Sends a password reset email.
 * Always returns 200 to prevent email enumeration.
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user) {
    // Generate a short-lived signed token (15 minutes)
    const resetToken = jwt.sign({ sub: user.id, purpose: 'password-reset' }, getPrivateKey(), {
      algorithm: 'RS256',
      expiresIn: '15m',
    })

    // In production: send email via Resend/SendGrid
    // For now: log the token (Sprint 7 placeholder)
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/reset-password?token=${resetToken}`

    if (process.env.NODE_ENV !== 'production') {
      // Log reset URL in dev so it can be tested without an email service
      require('../config/logger').info('Password reset URL (dev only)', { url: resetUrl, email })
    }
    // TODO Sprint 8: replace with Resend email send
  }

  // Always respond 200 — prevents email enumeration
  res.json(formatSuccess(null, 'If that email is registered, a reset link has been sent.'))
})

/**
 * POST /auth/reset-password
 * Verifies the reset token and updates the password.
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body

  let payload
  try {
    payload = jwt.verify(token, getPublicKey(), { algorithms: ['RS256'] })
  } catch {
    throw AppError.unauthorized('Reset token is invalid or has expired', ERROR_CODES.TOKEN_EXPIRED)
  }

  if (payload.purpose !== 'password-reset') {
    throw AppError.unauthorized('Invalid reset token', ERROR_CODES.TOKEN_INVALID)
  }

  const user = await User.findById(payload.sub)
  if (!user) throw AppError.notFound('User')

  user.password = password // pre-save hook will hash it
  await user.save()

  // Revoke all refresh tokens — force re-login on all devices
  await User.findByIdAndUpdate(user._id, { $set: { refreshTokens: [] } })

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.json(formatSuccess(null, 'Password updated successfully.'))
})

module.exports = { register, login, refresh, logout, me, forgotPassword, resetPassword }
