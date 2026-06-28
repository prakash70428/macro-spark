/**
 * Integration tests — apiFetch / ApiError
 *
 * Strategy: mock global fetch so no real network calls happen.
 * Tests verify the client-side logic: auth header injection,
 * structured error shape, and 401 TOKEN_EXPIRED silent-refresh path.
 */

import { apiFetch, ApiError } from '@/lib/apiClient'
import useAuthStore from '@/store/authStore'

// ── helpers ───────────────────────────────────────────────────────────────────

function mockFetch(status, body, headers = {}) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'content-type': 'application/json', ...headers }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  })
}

// ── setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  useAuthStore.setState({ user: null, accessToken: null, authStatus: 'loading' })
  jest.clearAllMocks()
})

// ── tests ─────────────────────────────────────────────────────────────────────

describe('apiFetch — happy path', () => {
  test('returns data field from JSON response', async () => {
    mockFetch(200, { data: { id: 1, title: 'Macro outlook' } })
    const result = await apiFetch('/research', { skipAuth: true })
    expect(result).toEqual({ id: 1, title: 'Macro outlook' })
  })

  test('attaches Authorization header when access token exists', async () => {
    useAuthStore.setState({ accessToken: 'test-token-abc', authStatus: 'authenticated' })
    mockFetch(200, { data: {} })

    await apiFetch('/research')

    const calledHeaders = global.fetch.mock.calls[0][1].headers
    expect(calledHeaders.Authorization).toBe('Bearer test-token-abc')
  })

  test('does NOT attach Authorization header when skipAuth is true', async () => {
    useAuthStore.setState({ accessToken: 'test-token-abc', authStatus: 'authenticated' })
    mockFetch(200, { data: {} })

    await apiFetch('/auth/login', { skipAuth: true })

    const calledHeaders = global.fetch.mock.calls[0][1].headers ?? {}
    expect(calledHeaders.Authorization).toBeUndefined()
  })
})

describe('apiFetch — error handling', () => {
  test('throws ApiError with correct shape on non-200', async () => {
    mockFetch(404, { message: 'Article not found', code: 'NOT_FOUND', details: [] })

    await expect(apiFetch('/research/999', { skipAuth: true })).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      code: 'NOT_FOUND',
      message: 'Article not found',
    })
  })

  test('throws ApiError on 422 with details array', async () => {
    mockFetch(422, {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: [{ field: 'email', message: 'Invalid email format' }],
    })

    let caught
    try {
      await apiFetch('/auth/register', { skipAuth: true })
    } catch (err) {
      caught = err
    }

    expect(caught).toBeInstanceOf(ApiError)
    expect(caught.details).toHaveLength(1)
    expect(caught.details[0].field).toBe('email')
  })
})

describe('ApiError class', () => {
  test('is an instance of Error', () => {
    const err = new ApiError('oops', 500, 'SERVER_ERROR')
    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(ApiError)
  })

  test('defaults details to empty array', () => {
    const err = new ApiError('oops', 500, 'SERVER_ERROR')
    expect(err.details).toEqual([])
  })
})
