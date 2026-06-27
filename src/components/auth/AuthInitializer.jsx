'use client'

/**
 * AuthInitializer — mounts once inside Providers.
 *
 * On every app boot (fresh tab, hard reload) this component:
 * 1. Tries to silently refresh the session via the HttpOnly refreshToken cookie
 * 2. On success → sets user + accessToken in Zustand (authStatus: 'authenticated')
 * 3. On failure → sets authStatus: 'unauthenticated' (user needs to log in)
 *
 * The rest of the app waits on authStatus !== 'loading' to know if a user is present.
 */

import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'
import { refreshSession } from '@/lib/authService'

export default function AuthInitializer() {
  const login     = useAuthStore((s) => s.login)
  const setStatus = useAuthStore((s) => s.setStatus)

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        const { user, accessToken } = await refreshSession()
        if (!cancelled) login(user, accessToken)
      } catch {
        // No valid session — this is the normal state for logged-out users
        if (!cancelled) setStatus('unauthenticated')
      }
    }

    init()

    return () => { cancelled = true }
  }, [login, setStatus])

  // Renders nothing — pure side-effect component
  return null
}
