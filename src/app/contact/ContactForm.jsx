'use client'

import Button from '@/components/ui/Button/Button'
import { useContactForm } from '@/hooks/useContactForm'
import styles from './page.module.scss'

export default function ContactForm() {
  const { form, fieldErrors, globalError, status, update, handleSubmit } = useContactForm()

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

      {globalError && (
        <div role="alert" className={styles.errorBanner}>
          {globalError}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Full name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            placeholder="Jane Smith"
            value={form.name}
            onChange={update('name')}
            required
            autoComplete="name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <span id="name-error" className={styles.fieldError} role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email address</label>
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
      </div>

      <div className={styles.field}>
        <label htmlFor="subject" className={styles.label}>Subject</label>
        <input
          id="subject"
          type="text"
          className={styles.input}
          placeholder="Press enquiry / Research question / Partnership"
          value={form.subject}
          onChange={update('subject')}
          required
          aria-invalid={!!fieldErrors.subject}
          aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
        />
        {fieldErrors.subject && (
          <span id="subject-error" className={styles.fieldError} role="alert">
            {fieldErrors.subject}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          className={styles.textarea}
          placeholder="Tell us how we can help…"
          value={form.message}
          onChange={update('message')}
          required
          rows={6}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message && (
          <span id="message-error" className={styles.fieldError} role="alert">
            {fieldErrors.message}
          </span>
        )}
      </div>

      <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
        Send message
      </Button>
    </form>
  )
}
