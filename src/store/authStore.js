/**
 * Auth store — single source of truth for authentication state.
 *
 * WHY ZUSTAND:
 * - Zero boilerplate vs Redux, no Provider wrapping needed
 * - Selector-based subscriptions: components re-render only when their slice changes
 * - Synchronous reads outside React (useful in apiClient interceptor)
 * - Tiny bundle: ~1KB gzipped
 *
 * WHY accessToken IN MEMORY (not localStorage):
 * - localStorage is accessible to ALL JavaScript on the page
 * - Any XSS attack → attacker reads localStorage → full account takeover
 * - In-memory: tab close = token gone. XSS can't read another closure's memory.
 * - Refresh token lives in HttpOnly cookie: JS can't read it, browser sends automatically
 * - This pattern: accessToken in RAM + refreshToken in HttpOnly cookie = industry standard
 */

import { create } from 'zustand'

/**
 * @typedef {'loading' | 'authenticated' | 'unauthenticated'} AuthStatus
 *
 * @typedef {{
 *   id: string,
 *   email: string,
 *   role: string,
 *   firstName?: string,
 *   lastName?: string,
 * }} AuthUser
 *
 * @typedef {{
 *   user: AuthUser | null,
 *   accessToken: string | null,
 *   authStatus: AuthStatus,
 *   login: (user: AuthUser, token: string) => void,
 *   logout: () => void,
 *   setToken: (token: string) => void,
 *   setStatus: (status: AuthStatus) => void,
 * }} AuthState
 */

/** @type {import('zustand').StoreApi<AuthState>} */
const useAuthStore = create((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  user:        null,
  accessToken: null,
  authStatus:  'loading',

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Called after successful login OR after a successful token refresh on boot.
   * @param {AuthUser} user
   * @param {string} token - RS256 access token (in-memory only)
   */
  login: (user, token) =>
    set({ user, accessToken: token, authStatus: 'authenticated' }),

  /**
   * Called after logout API call completes.
   * Clears all auth state — HttpOnly cookie is cleared by the server.
   */
  logout: () =>
    set({ user: null, accessToken: null, authStatus: 'unauthenticated' }),

  /**
   * Called by the apiClient interceptor after a silent token refresh.
   * Does NOT reset user — user object stays as-is, only token rotates.
   * @param {string} token - new access token
   */
  setToken: (token) => set({ accessToken: token }),

  /**
   * Called by AuthInitializer to signal boot-time check is complete.
   * @param {AuthStatus} status
   */
  setStatus: (status) => set({ authStatus: status }),
}))

export default useAuthStore
