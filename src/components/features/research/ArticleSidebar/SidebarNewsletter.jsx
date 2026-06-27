'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import styles from './ArticleSidebar.module.scss'

export default function SidebarNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  if (status === 'success') {
    return <p style={{ color: 'var(--color-status-success)', fontSize: '0.875rem' }}>✓ You&apos;re subscribed!</p>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
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
    </form>
  )
}
