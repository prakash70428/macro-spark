/**
 * Unit tests — useContactForm hook
 */

import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '@/hooks/useContactForm'

// Mock the api client — we don't want real HTTP calls
jest.mock('@/lib/apiClient', () => ({
  api: {
    post: jest.fn(),
  },
  ApiError: class ApiError extends Error {
    constructor(message, status, code, details = []) {
      super(message)
      this.name = 'ApiError'
      this.status = status
      this.code = code
      this.details = details
    }
  },
}))

const { api } = require('@/lib/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useContactForm — initial state', () => {
  test('starts with empty form fields and idle status', () => {
    const { result } = renderHook(() => useContactForm())
    expect(result.current.form).toEqual({ name: '', email: '', subject: '', message: '' })
    expect(result.current.status).toBe('idle')
    expect(result.current.globalError).toBe('')
  })
})

describe('useContactForm — update', () => {
  test('updates the correct field and clears its error', () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.update('name')({ target: { value: 'Jane Smith' } })
    })

    expect(result.current.form.name).toBe('Jane Smith')
    expect(result.current.fieldErrors.name).toBe('')
  })
})

describe('useContactForm — client-side validation', () => {
  test('blocks submission and sets field errors when form is empty', async () => {
    const { result } = renderHook(() => useContactForm())

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() })
    })

    expect(api.post).not.toHaveBeenCalled()
    expect(result.current.fieldErrors.name).toBeTruthy()
    expect(result.current.fieldErrors.email).toBeTruthy()
    expect(result.current.fieldErrors.subject).toBeTruthy()
    expect(result.current.fieldErrors.message).toBeTruthy()
  })

  test('rejects invalid email format', async () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.update('name')({ target: { value: 'Jane' } })
      result.current.update('email')({ target: { value: 'not-an-email' } })
      result.current.update('subject')({ target: { value: 'Test' } })
      result.current.update('message')({
        target: { value: 'This is a long enough message to pass validation.' },
      })
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() })
    })

    expect(result.current.fieldErrors.email).toMatch(/valid email/i)
    expect(api.post).not.toHaveBeenCalled()
  })
})

describe('useContactForm — successful submission', () => {
  test('calls api.post and sets status to success', async () => {
    api.post.mockResolvedValue({ success: true })

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.update('name')({ target: { value: 'Jane Smith' } })
      result.current.update('email')({ target: { value: 'jane@example.com' } })
      result.current.update('subject')({ target: { value: 'Research inquiry' } })
      result.current.update('message')({
        target: { value: 'Interested in your macro analysis reports.' },
      })
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() })
    })

    expect(api.post).toHaveBeenCalledWith(
      '/contact',
      expect.objectContaining({
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Research inquiry',
      }),
      { skipAuth: true }
    )

    expect(result.current.status).toBe('success')
  })
})

describe('useContactForm — server error handling', () => {
  test('sets globalError on generic server error', async () => {
    const { ApiError } = require('@/lib/apiClient')
    api.post.mockRejectedValue(new ApiError('Server error', 500, 'SERVER_ERROR'))

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.update('name')({ target: { value: 'Jane' } })
      result.current.update('email')({ target: { value: 'jane@example.com' } })
      result.current.update('subject')({ target: { value: 'Test' } })
      result.current.update('message')({
        target: { value: 'Long enough test message here please.' },
      })
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() })
    })

    expect(result.current.globalError).toBeTruthy()
    expect(result.current.status).toBe('idle')
  })
})
