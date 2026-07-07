'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import styles from './page.module.scss'

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
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
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
      />
      <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
        Subscribe free →
      </Button>
    </form>
  )
}
