'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import { ROUTES } from '@/constants/routes'
import useAuthStore from '@/store/authStore'
import { loginUser } from '@/lib/authService'
import { ApiError } from '@/lib/apiClient'
import styles from './page.module.scss'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeLogin = useAuthStore((s) => s.login)

  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function update(field) {
    return (e) => {
      setForm((p) => ({ ...p, [field]: e.target.value }))
      setFieldErrors((p) => ({ ...p, [field]: '' }))
      setError('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    setFieldErrors({})

    try {
      const data = await loginUser({ email: form.email, password: form.password })

      // Persist in Zustand store (in-memory — safe from XSS)
      storeLogin(data.user, data.accessToken)

      // Redirect to original destination or dashboard
      const next = searchParams.get('next') || ROUTES.DASHBOARD
      router.push(next)
    } catch (err) {
      setStatus('idle')

      if (err instanceof ApiError) {
        if (err.status === 422 && err.details?.length) {
          // Field-level validation errors
          const errs = {}
          err.details.forEach(({ field, message }) => {
            errs[field] = message
          })
          setFieldErrors(errs)
        } else if (err.status === 401) {
          setError('Invalid email or password.')
        } else if (err.code === 'ACCOUNT_LOCKED') {
          setError('Account locked due to too many failed attempts. Try again in 30 minutes.')
        } else {
          setError(err.message || 'Something went wrong. Please try again.')
        }
      } else {
        setError('Unable to connect. Check your internet connection.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Global error */}
      {error && (
        <div role="alert" className={styles.errorBanner}>
          {error}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="jane@example.com"
          value={form.email}
          onChange={update('email')}
          required
          autoComplete="email"
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldErrors.email && (
          <span id="email-error" className={styles.fieldError} role="alert">
            {fieldErrors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Link href={ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={form.password}
          onChange={update('password')}
          required
          autoComplete="current-password"
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
        />
        {fieldErrors.password && (
          <span id="password-error" className={styles.fieldError} role="alert">
            {fieldErrors.password}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={status === 'loading'}
        disabled={status === 'loading'}
      >
        Sign in
      </Button>
    </form>
  )
}
