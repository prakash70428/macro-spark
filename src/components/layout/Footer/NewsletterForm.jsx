'use client'

import { useState } from 'react'
import Button from '../../ui/Button/Button'
import styles from './Footer.module.scss'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    // API call Sprint 3 mein aayega
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
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
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="primary" size="sm" loading={status === 'loading'}>
        Subscribe
      </Button>
    </form>
  )
}
