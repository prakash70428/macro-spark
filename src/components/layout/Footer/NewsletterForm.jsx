'use client'

import { useState } from 'react'
import Button from '../../ui/Button/Button'
import { api, ApiError } from '@/lib/apiClient'
import styles from './Footer.module.scss'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await api.post('/newsletter/subscribe', { email: email.trim(), source: 'footer' }, { skipAuth: true })
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof ApiError
          ? err.message || 'Something went wrong. Please try again.'
          : 'Unable to connect. Check your internet connection.'
      )
    }
  }

  if (status === 'success') {
    return <p className={styles.successMsg}>✓ Subscribed! Check your inbox.</p>
  }

  return (
    <form
      className={styles.newsletterForm}
      onSubmit={handleSubmit}
      aria-label="Newsletter subscription"
    >
      <input
        type="email"
        className={styles.emailInput}
        placeholder="your@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        required
      />
      <Button type="submit" variant="primary" size="sm" loading={status === 'loading'}>
        Subscribe
      </Button>
      {status === 'error' && (
        <p role="alert" style={{ color: 'var(--color-market-negative)', fontSize: '0.8125rem' }}>
          {errorMessage}
        </p>
      )}
    </form>
  )
}
