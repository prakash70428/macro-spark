'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import { api, ApiError } from '@/lib/apiClient'
import styles from './page.module.scss'

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await api.post(
        '/newsletter/subscribe',
        { email: email.trim(), source: 'footer' },
        { skipAuth: true }
      )
      setStatus('success')
    } catch (err) {
      setStatus('error')
      if (err instanceof ApiError) {
        setErrorMessage(err.message || 'Something went wrong. Please try again.')
      } else {
        setErrorMessage('Unable to connect. Check your internet connection.')
      }
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-market-positive)', fontWeight: 500, padding: '1rem 0' }}>
        ✓ You're in! Check your inbox for a welcome email.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="email"
        className={styles.input}
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        required
        aria-label="Email address"
      />
      <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
        Subscribe free →
      </Button>
      {status === 'error' && (
        <p
          role="alert"
          style={{
            color: 'var(--color-market-negative)',
            fontSize: 'var(--text-caption, 0.8125rem)',
            width: '100%',
          }}
        >
          {errorMessage}
        </p>
      )}
    </form>
  )
}
