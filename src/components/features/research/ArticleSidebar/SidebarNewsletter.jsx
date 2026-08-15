'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import { api, ApiError } from '@/lib/apiClient'
import styles from './ArticleSidebar.module.scss'

export default function SidebarNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await api.post(
        '/newsletter/subscribe',
        { email: email.trim(), source: 'article' },
        { skipAuth: true }
      )
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setErrorMessage(
        err instanceof ApiError
          ? err.message || 'Something went wrong. Please try again.'
          : 'Unable to connect. Check your internet connection.'
      )
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-status-success)', fontSize: '0.875rem' }}>
        ✓ You&apos;re subscribed!
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      <input
        type="email"
        className={styles.nlInput}
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address for newsletter"
      />
      <Button type="submit" variant="primary" size="sm" loading={status === 'loading'} fullWidth>
        Subscribe free
      </Button>
      {errorMessage && (
        <p role="alert" style={{ color: 'var(--color-market-negative)', fontSize: '0.8125rem' }}>
          {errorMessage}
        </p>
      )}
    </form>
  )
}
