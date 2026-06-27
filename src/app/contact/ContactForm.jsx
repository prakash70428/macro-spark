'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import styles from './page.module.scss'

export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h2 className={styles.successTitle}>Message received</h2>
        <p className={styles.successDesc}>
          We'll be in touch within 2 business days. Check your inbox for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Full name</label>
          <input
            id="name" type="text" className={styles.input}
            placeholder="Jane Smith" value={form.name}
            onChange={update('name')} required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email address</label>
          <input
            id="email" type="email" className={styles.input}
            placeholder="jane@example.com" value={form.email}
            onChange={update('email')} required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="subject" className={styles.label}>Subject</label>
        <input
          id="subject" type="text" className={styles.input}
          placeholder="Press enquiry / Research question / Partnership"
          value={form.subject} onChange={update('subject')} required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message" className={styles.textarea}
          placeholder="Tell us how we can help…"
          value={form.message} onChange={update('message')} required
          rows={6}
        />
      </div>

      <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
        Send message
      </Button>
    </form>
  )
}
