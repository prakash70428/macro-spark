/**
 * MacroSpark API client.
 *
 * Features:
 * - Auto-attaches Authorization header from Zustand store
 * - Silent token refresh on 401 TOKEN_EXPIRED
 * - Request queue: concurrent requests during refresh wait for new token
 * - Throws structured ApiError objects so callers can pattern-match codes
 */

import useAuthStore from '@/store/authStore'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'

// ── Refresh queue ──────────────────────────────────────────────────────────────
// When a 401 fires and refresh is in-flight, subsequent calls queue here.
// Once refresh resolves, queued calls retry with the new token.

let isRefreshing = false

/** @type {Array<(token: string) => void>} */
let pendingQueue = []

function resolveQueue(newToken) {
  pendingQueue.forEach((cb) => cb(newToken))
  pendingQueue = []
}

function rejectQueue() {
  pendingQueue.forEach((cb) => cb(null))
  pendingQueue = []
}

// ── Error class ───────────────────────────────────────────────────────────────

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   * @param {string} code - machine-readable error code from server
   * @param {Array<{field: string, message: string}>} [details]
   */
  constructor(message, status, code, details = []) {
    super(message)
    this.name    = 'ApiError'
    this.status  = status
    this.code    = code
    this.details = details
  }
}

// ── Silent refresh ─────────────────────────────────────────────────────────────

async function silentRefresh() {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method:      'POST',
    credentials: 'include', // sends HttpOnly refreshToken cookie
    headers:     { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    // Refresh failed — user must log in again
    useAuthStore.getState().logout()
    throw new ApiError('Session expired', 401, 'TOKEN_REVOKED')
  }

  const body = await res.json()
  const newToken = body.data.accessToken
  useAuthStore.getState().setToken(newToken)
  return newToken
}

// ── Core fetch wrapper ─────────────────────────────────────────────────────────

/**
 * @param {string} path - path relative to BASE_URL (e.g. '/research')
 * @param {RequestInit & { skipAuth?: boolean }} [options]
 * @returns {Promise<any>} - parsed JSON data field
 */
export async function apiFetch(path, options = {}) {
  const { skipAuth = false, ...fetchOptions } = options

  // Attach auth header
  if (!skipAuth) {
    const token = useAuthStore.getState().accessToken
    if (token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  // Default JSON content-type for bodies
  if (fetchOptions.body && typeof fetchOptions.body === 'string') {
    fetchOptions.headers = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    }
  }

  fetchOptions.credentials = 'include' // always send cookies

  const res = await fetch(`${BASE_URL}${path}`, fetchOptions)

  // Parse response
  let body
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    body = await res.json()
  } else {
    body = { data: null, message: await res.text() }
  }

  // Happy path
  if (res.ok) return body.data ?? body

  // ── 401 handling: try silent refresh once ─────────────────────────────────
  if (res.status === 401 && !skipAuth && body?.code === 'TOKEN_EXPIRED') {
    if (isRefreshing) {
      // Another request already triggered refresh — wait in queue
      return new Promise((resolve, reject) => {
        pendingQueue.push((newToken) => {
          if (!newToken) return reject(new ApiError('Session expired', 401, 'TOKEN_REVOKED'))

          const retryOptions = {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${newToken}`,
            },
          }

          apiFetch(path, { ...retryOptions, skipAuth: true })
            .then(resolve)
            .catch(reject)
        })
      })
    }

    isRefreshing = true

    try {
      const newToken = await silentRefresh()
      resolveQueue(newToken)
      isRefreshing = false

      // Retry original request with new token
      return apiFetch(path, {
        ...options,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${newToken}`,
        },
        skipAuth: true,
      })
    } catch (err) {
      rejectQueue()
      isRefreshing = false
      throw err
    }
  }

  // ── Other errors ──────────────────────────────────────────────────────────
  throw new ApiError(
    body?.message ?? 'Request failed',
    res.status,
    body?.code    ?? 'UNKNOWN_ERROR',
    body?.details ?? []
  )
}

// ── Convenience methods ────────────────────────────────────────────────────────

export const api = {
  /** @param {string} path @param {RequestInit} [opts] */
  get: (path, opts)  => apiFetch(path, { method: 'GET',    ...opts }),

  /** @param {string} path @param {unknown} body @param {RequestInit} [opts] */
  post: (path, body, opts)  => apiFetch(path, { method: 'POST',   body: JSON.stringify(body), ...opts }),

  /** @param {string} path @param {unknown} body @param {RequestInit} [opts] */
  patch: (path, body, opts) => apiFetch(path, { method: 'PATCH',  body: JSON.stringify(body), ...opts }),

  /** @param {string} path @param {RequestInit} [opts] */
  delete: (path, opts)      => apiFetch(path, { method: 'DELETE', ...opts }),
}
