'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button/Button'
import { ROUTES } from '@/constants/routes'
import { requestPasswordReset } from '@/lib/authService'
import styles from '../login/page.module.scss'

export default function ForgotPasswordForm() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      await requestPasswordReset({ email })
      setStatus('sent')
    } catch {
      // Always show "sent" — prevents email enumeration attacks
      // (attacker can't tell if email exists in our system)
      setStatus('sent')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" style={{ padding: 'var(--space-4) 0' }}>
        <p style={{ color: 'var(--color-market-positive)', marginBottom: 'var(--space-2)' }}>
          ✓ If that email is registered, a reset link is on its way.
        </p>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
          Check your spam folder if you don&apos;t see it within 5 minutes.
        </p>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div role="alert" className={styles.errorBanner} style={{ marginBottom: 'var(--space-4)' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email address</label>
          <input
            id="email" type="email" className={styles.input}
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            required
            autoComplete="email"
          />
        </div>
        <Button type="submit" variant="primary" fullWidth loading={status === 'loading'}>
          Send reset link
        </Button>
      </form>
      <p className={styles.footer}>
        <Link href={ROUTES.LOGIN} className={styles.footerLink}>← Back to sign in</Link>
      </p>
    </>
  )
}
