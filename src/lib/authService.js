/**
 * Auth service — thin wrapper around apiClient for auth endpoints.
 * Keeps controller logic out of React components.
 */

import { api, apiFetch } from './apiClient'

/**
 * @param {{ email: string, password: string }} creds
 * @returns {Promise<{ user: import('@/store/authStore').AuthUser, accessToken: string }>}
 */
export async function loginUser(creds) {
  return api.post('/auth/login', creds, { skipAuth: true })
}

/**
 * @param {{ email: string, password: string, firstName?: string, lastName?: string }} data
 * @returns {Promise<{ user: import('@/store/authStore').AuthUser, accessToken: string }>}
 */
export async function registerUser(data) {
  return api.post('/auth/register', data, { skipAuth: true })
}

/**
 * Attempts to silently refresh the session using HttpOnly cookie.
 * Called once on app boot by AuthInitializer.
 *
 * @returns {Promise<{ user: import('@/store/authStore').AuthUser, accessToken: string }>}
 */
export async function refreshSession() {
  // Get new access token from refresh cookie
  const tokenData = await apiFetch('/auth/refresh', {
    method: 'POST',
    skipAuth: true,
    credentials: 'include',
  })

  // Then fetch the user profile
  const user = await apiFetch('/auth/me', {
    headers: { Authorization: `Bearer ${tokenData.accessToken}` },
    skipAuth: true,
    credentials: 'include',
  })

  return { accessToken: tokenData.accessToken, user }
}

/**
 * Revokes the refresh token on the server and clears the HttpOnly cookie.
 */
export async function logoutUser() {
  return apiFetch('/auth/logout', {
    method: 'POST',
    skipAuth: true,
    credentials: 'include',
  })
}

/**
 * @param {{ email: string }} payload
 */
export async function requestPasswordReset(payload) {
  return api.post('/auth/forgot-password', payload, { skipAuth: true })
}

/**
 * @param {{ token: string, password: string }} payload
 */
export async function resetPassword(payload) {
  return api.post('/auth/reset-password', payload, { skipAuth: true })
}
