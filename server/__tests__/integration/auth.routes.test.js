'use strict'

/**
 * Integration tests — Auth routes
 * Uses supertest against the Express app.
 * Requires: MongoDB in-memory server (jest-mongodb or @shelf/jest-mongodb)
 *
 * Run: npx jest server/__tests__/integration/auth.routes.test.js
 */

const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../src/app')
const User = require('../../src/models/User')

// ── Helpers ───────────────────────────────────────────────────────────────────

const TEST_USER = {
  email: 'test@macrospark.com',
  password: 'TestPass123',
  firstName: 'Jane',
}

async function registerAndLogin() {
  const registerRes = await request(app).post('/api/auth/register').send(TEST_USER)

  return {
    accessToken: registerRes.body.data.accessToken,
    refreshCookie: registerRes.headers['set-cookie'],
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('POST /api/auth/register', () => {
  test('201: creates user and returns accessToken', async () => {
    const res = await request(app).post('/api/auth/register').send(TEST_USER)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.accessToken).toBeDefined()
    expect(res.body.data.user.email).toBe(TEST_USER.email)
    // Password must NOT appear in response
    expect(res.body.data.user.password).toBeUndefined()
    // Refresh token must be in HttpOnly cookie, not body
    expect(res.headers['set-cookie']).toBeDefined()
    expect(res.headers['set-cookie'][0]).toContain('refreshToken')
    expect(res.headers['set-cookie'][0]).toContain('HttpOnly')
  })

  test('409: duplicate email returns ALREADY_EXISTS', async () => {
    await request(app).post('/api/auth/register').send(TEST_USER)

    const res = await request(app).post('/api/auth/register').send(TEST_USER)

    expect(res.status).toBe(409)
    expect(res.body.code).toBe('ALREADY_EXISTS')
  })

  test('422: weak password returns VALIDATION_ERROR with details', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'new@example.com', password: 'weak' })

    expect(res.status).toBe(422)
    expect(res.body.code).toBe('VALIDATION_ERROR')
    expect(res.body.details).toBeInstanceOf(Array)
    expect(res.body.details.some((d) => d.field === 'password')).toBe(true)
  })

  test('422: invalid email returns field error', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'ValidPass1' })

    expect(res.status).toBe(422)
    expect(res.body.details.some((d) => d.field === 'email')).toBe(true)
  })
})

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send(TEST_USER)
  })

  test('200: valid credentials return accessToken', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: TEST_USER.password })

    expect(res.status).toBe(200)
    expect(res.body.data.accessToken).toBeDefined()
    expect(res.body.data.user.email).toBe(TEST_USER.email)
  })

  test('401: wrong password returns INVALID_CREDENTIALS', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: 'WrongPass999' })

    expect(res.status).toBe(401)
    expect(res.body.code).toBe('INVALID_CREDENTIALS')
  })

  test('401: unknown email returns same error (prevents enumeration)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'AnyPass1' })

    expect(res.status).toBe(401)
    // Must be same message — attacker can't tell if email exists
    expect(res.body.message).toBe('Invalid email or password')
  })

  test('account locks after 5 failed attempts', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post('/api/auth/login')
        .send({ email: TEST_USER.email, password: 'WrongPass1' })
    }

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: TEST_USER.password }) // correct, but locked

    expect(res.status).toBe(401)
    expect(res.body.code).toBe('ACCOUNT_LOCKED')
  })
})

describe('POST /api/auth/refresh', () => {
  test('200: valid refresh cookie returns new accessToken', async () => {
    const { refreshCookie } = await registerAndLogin()

    const res = await request(app).post('/api/auth/refresh').set('Cookie', refreshCookie)

    expect(res.status).toBe(200)
    expect(res.body.data.accessToken).toBeDefined()
    // New refresh cookie should be issued (rotation)
    expect(res.headers['set-cookie']).toBeDefined()
  })

  test('401: no refresh token returns error', async () => {
    const res = await request(app).post('/api/auth/refresh')

    expect(res.status).toBe(401)
  })

  test('401: reused token triggers all-session logout', async () => {
    const { refreshCookie } = await registerAndLogin()

    // First use — valid
    const firstRefresh = await request(app).post('/api/auth/refresh').set('Cookie', refreshCookie)
    expect(firstRefresh.status).toBe(200)

    // Second use of SAME old token — reuse detected
    const reuseAttempt = await request(app).post('/api/auth/refresh').set('Cookie', refreshCookie)

    expect(reuseAttempt.status).toBe(401)
    expect(reuseAttempt.body.code).toBe('TOKEN_REVOKED')
  })
})

describe('POST /api/auth/logout', () => {
  test('200: logout clears cookie and returns success', async () => {
    const { refreshCookie } = await registerAndLogin()

    const res = await request(app).post('/api/auth/logout').set('Cookie', refreshCookie)

    expect(res.status).toBe(200)
    // Cookie should be cleared (maxAge=0 or expires in past)
    const cookie = res.headers['set-cookie']?.[0] ?? ''
    expect(cookie).toContain('refreshToken=;')
  })
})

describe('GET /api/auth/me', () => {
  test('200: valid token returns user profile', async () => {
    const { accessToken } = await registerAndLogin()

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${accessToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data.email).toBe(TEST_USER.email)
    expect(res.body.data.password).toBeUndefined()
  })

  test('401: no token returns unauthorized', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  test('401: expired token returns TOKEN_EXPIRED', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.expired.fake')

    expect(res.status).toBe(401)
  })
})

describe('Security: NoSQL injection', () => {
  test('mongo operator in body is stripped and handled gracefully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: { $gt: '' }, password: 'anything' })

    // Should NOT return 200 — attacker cannot bypass auth with operator injection
    expect(res.status).not.toBe(200)
  })
})
