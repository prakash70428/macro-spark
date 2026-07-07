/**
 * Unit tests — Zustand auth store
 * Run: npx jest src/__tests__/unit/authStore.test.js
 */

import { act, renderHook } from '@testing-library/react'
import useAuthStore from '@/store/authStore'

// Reset store state between tests
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    accessToken: null,
    authStatus: 'loading',
  })
})

describe('authStore — initial state', () => {
  test('starts in loading state with no user or token', () => {
    const { result } = renderHook(() => useAuthStore((s) => s))
    expect(result.current.user).toBeNull()
    expect(result.current.accessToken).toBeNull()
    expect(result.current.authStatus).toBe('loading')
  })
})

describe('authStore — login action', () => {
  const mockUser = { id: 'u1', email: 'jane@example.com', role: 'guest' }
  const mockToken = 'eyJhbGc.fake.token'

  test('sets user, token, and authStatus to authenticated', () => {
    const { result } = renderHook(() => useAuthStore((s) => s))

    act(() => {
      result.current.login(mockUser, mockToken)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.accessToken).toBe(mockToken)
    expect(result.current.authStatus).toBe('authenticated')
  })
})

describe('authStore — logout action', () => {
  test('clears user, token, and sets status to unauthenticated', () => {
    const { result } = renderHook(() => useAuthStore((s) => s))

    // First login
    act(() => {
      result.current.login({ id: 'u1', email: 'jane@example.com', role: 'guest' }, 'token123')
    })

    // Then logout
    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.accessToken).toBeNull()
    expect(result.current.authStatus).toBe('unauthenticated')
  })
})

describe('authStore — setToken action', () => {
  test('updates only the token, user stays unchanged', () => {
    const mockUser = { id: 'u1', email: 'jane@example.com', role: 'guest' }
    const { result } = renderHook(() => useAuthStore((s) => s))

    act(() => {
      result.current.login(mockUser, 'old-token')
    })

    act(() => {
      result.current.setToken('new-rotated-token')
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.accessToken).toBe('new-rotated-token')
    expect(result.current.authStatus).toBe('authenticated')
  })
})

describe('authStore — setStatus action', () => {
  test('updates authStatus independently', () => {
    const { result } = renderHook(() => useAuthStore((s) => s))

    act(() => {
      result.current.setStatus('unauthenticated')
    })

    expect(result.current.authStatus).toBe('unauthenticated')
    expect(result.current.user).toBeNull()
  })
})
