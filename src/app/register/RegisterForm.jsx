'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import { ROUTES } from '@/constants/routes'
import useAuthStore from '@/store/authStore'
import { registerUser } from '@/lib/authService'
import { ApiError } from '@/lib/apiClient'
import styles from './page.module.scss'

export default function RegisterForm() {
  const router     = useRouter()
  const storeLogin = useAuthStore((s) => s.login)

  const [form, setForm]     = useState({ firstName: '', email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function update(field) {
    return (e) => {
      setForm((p)       => ({ ...p, [field]: e.target.value }))
      setFieldErrors((p) => ({ ...p, [field]: '' }))
      setError('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    setFieldErrors({})

    try {
      const data = await registerUser({
        email:     form.email,
        password:  form.password,
        firstName: form.firstName || undefined,
      })

      storeLogin(data.user, data.accessToken)
      router.push(ROUTES.DASHBOARD)
    } catch (err) {
      setStatus('idle')

      if (err instanceof ApiError) {
        if (err.status === 422 && err.details?.length) {
          const errs = {}
          err.details.forEach(({ field, message }) => { errs[field] = message })
          setFieldErrors(errs)
        } else if (err.code === 'ALREADY_EXISTS') {
          setFieldErrors({ email: 'An account with this email already exists.' })
        } else {
          setError(err.message || 'Registration failed. Please try again.')
        }
      } else {
        setError('Unable to connect. Check your internet connection.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {error && (
        <div role="alert" className={styles.errorBanner}>
          {error}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="firstName" className={styles.label}>First name</label>
        <input
          id="firstName"
          type="text"
          className={styles.input}
          placeholder="Jane"
          value={form.firstName}
          onChange={update('firstName')}
          autoComplete="given-name"
          aria-invalid={!!fieldErrors.firstName}
        />
        {fieldErrors.firstName && (
          <span className={styles.fieldError} role="alert">{fieldErrors.firstName}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Work email</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="jane@company.com"
          value={form.email}
          onChange={update('email')}
          required
          autoComplete="email"
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'reg-email-error' : undefined}
        />
        {fieldErrors.email && (
          <span id="reg-email-error" className={styles.fieldError} role="alert">
            {fieldErrors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password{' '}
          <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>
            (min 8 chars, 1 uppercase, 1 number)
          </span>
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={form.password}
          onChange={update('password')}
          required
          minLength={8}
          autoComplete="new-password"
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? 'reg-password-error' : undefined}
        />
        {fieldErrors.password && (
          <span id="reg-password-error" className={styles.fieldError} role="alert">
            {fieldErrors.password}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={status === 'loading'}
        disabled={status === 'loading'}
      >
        Create free account
      </Button>

      <p className={styles.terms}>
        By registering you agree to our{' '}
        <Link href={ROUTES.TERMS} className={styles.termsLink}>Terms of Service</Link>
        {' '}and{' '}
        <Link href={ROUTES.PRIVACY} className={styles.termsLink}>Privacy Policy</Link>.
      </p>
    </form>
  )
}
