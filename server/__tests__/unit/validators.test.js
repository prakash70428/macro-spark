'use strict'

/**
 * Unit tests — Zod validators
 * Run: npx jest server/__tests__/unit/validators.test.js
 */

const { registerSchema, loginSchema } = require('../../src/validators/auth.validator')
const { listQuerySchema }             = require('../../src/validators/research.validator')
const { subscribeSchema }             = require('../../src/validators/newsletter.validator')

// ── Auth validators ────────────────────────────────────────────────────────────

describe('registerSchema', () => {
  const valid = { email: 'Jane@Example.COM', password: 'ValidPass1', firstName: 'Jane' }

  test('passes with valid data and lowercases email', () => {
    const result = registerSchema.safeParse(valid)
    expect(result.success).toBe(true)
    expect(result.data.email).toBe('jane@example.com')
  })

  test('fails: password too short', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'Sh0rt' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].path).toContain('password')
  })

  test('fails: password missing uppercase', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'nouppercasenum1' })
    expect(result.success).toBe(false)
  })

  test('fails: password missing number', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'NoNumberHere' })
    expect(result.success).toBe(false)
  })

  test('fails: invalid email format', () => {
    const result = registerSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  test('passes without optional firstName/lastName', () => {
    const result = registerSchema.safeParse({ email: 'a@b.com', password: 'ValidPass1' })
    expect(result.success).toBe(true)
  })
})

describe('loginSchema', () => {
  test('passes with valid email and password', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: 'anystring' })
    expect(result.success).toBe(true)
  })

  test('fails: empty password', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: '' })
    expect(result.success).toBe(false)
  })
})

// ── Research validators ────────────────────────────────────────────────────────

describe('listQuerySchema', () => {
  test('defaults: page=1, limit=12, sort=latest', () => {
    const result = listQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    expect(result.data.page).toBe(1)
    expect(result.data.limit).toBe(12)
    expect(result.data.sort).toBe('latest')
  })

  test('coerces page and limit from strings to numbers', () => {
    const result = listQuerySchema.safeParse({ page: '3', limit: '20' })
    expect(result.success).toBe(true)
    expect(result.data.page).toBe(3)
    expect(result.data.limit).toBe(20)
  })

  test('rejects invalid sort value', () => {
    const result = listQuerySchema.safeParse({ sort: 'popular' })
    expect(result.success).toBe(false)
  })

  test('rejects limit > 50', () => {
    const result = listQuerySchema.safeParse({ limit: '100' })
    expect(result.success).toBe(false)
  })

  test('rejects page < 1', () => {
    const result = listQuerySchema.safeParse({ page: '0' })
    expect(result.success).toBe(false)
  })

  test('accepts both sort values', () => {
    expect(listQuerySchema.safeParse({ sort: 'latest' }).success).toBe(true)
    expect(listQuerySchema.safeParse({ sort: 'oldest' }).success).toBe(true)
  })
})
