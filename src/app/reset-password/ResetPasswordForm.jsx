'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import { ROUTES } from '@/constants/routes'
import { resetPassword } from '@/lib/authService'
import { ApiError } from '@/lib/apiClient'
import styles from '../login/page.module.scss'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  // Validate token presence on mount
  if (!token) {
    return (
      <div>
        <p style={{ color: 'var(--color-status-error)', marginBottom: 'var(--space-4)' }}>
          This reset link is invalid or has expired.
        </p>
        <Link href={ROUTES.FORGOT_PASSWORD} className={styles.footerLink}>
          Request a new reset link →
        </Link>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setStatus('loading')

    try {
      await resetPassword({ token, password })
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      if (err instanceof ApiError && err.code === 'TOKEN_EXPIRED') {
        setError('This reset link has expired. Please request a new one.')
      } else {
        setError(err?.message || 'Reset failed. Please try again.')
      }
    }
  }

  if (status === 'done') {
    return (
      <div role="status">
        <p style={{ color: 'var(--color-market-positive)', marginBottom: 'var(--space-4)' }}>
          ✓ Password updated successfully.
        </p>
        <Button as={Link} href={ROUTES.LOGIN} variant="primary" fullWidth>
          Sign in with new password
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
    >
      {error && (
        <div role="alert" className={styles.errorBanner}>
          {error}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          New password{' '}
          <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>
            (min 8 chars, 1 uppercase, 1 number)
          </span>
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError('')
          }}
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="confirm" className={styles.label}>
          Confirm new password
        </label>
        <input
          id="confirm"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value)
            setError('')
          }}
          required
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" variant="primary" fullWidth loading={status === 'loading'}>
        Set new password
      </Button>

      <p className={styles.footer}>
        <Link href={ROUTES.LOGIN} className={styles.footerLink}>
          ← Back to sign in
        </Link>
      </p>
    </form>
  )
}
