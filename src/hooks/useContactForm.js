import { useState } from 'react'
import { api, ApiError } from '@/lib/apiClient'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', subject: '', message: '' }

/**
 * Encapsulates all state and submission logic for the contact form.
 * Keeps ContactForm.jsx as a pure rendering component.
 *
 * @returns {{
 *   form: typeof INITIAL_FORM,
 *   fieldErrors: typeof INITIAL_ERRORS,
 *   globalError: string,
 *   status: 'idle' | 'loading' | 'success',
 *   update: (field: string) => (e: React.ChangeEvent) => void,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>,
 * }}
 */
export function useContactForm() {
  const [form, setForm]               = useState(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState(INITIAL_ERRORS)
  const [globalError, setGlobalError] = useState('')
  const [status, setStatus]           = useState('idle')

  function update(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setFieldErrors((prev) => ({ ...prev, [field]: '' }))
      setGlobalError('')
    }
  }

  function validate() {
    const errs = { ...INITIAL_ERRORS }
    let valid = true

    if (!form.name.trim()) {
      errs.name = 'Full name is required.'
      valid = false
    }

    if (!form.email.trim()) {
      errs.email = 'Email address is required.'
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.'
      valid = false
    }

    if (!form.subject.trim()) {
      errs.subject = 'Subject is required.'
      valid = false
    }

    if (!form.message.trim()) {
      errs.message = 'Message is required.'
      valid = false
    } else if (form.message.trim().length < 20) {
      errs.message = 'Message must be at least 20 characters.'
      valid = false
    }

    setFieldErrors(errs)
    return valid
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')

    if (!validate()) return

    setStatus('loading')

    try {
      await api.post('/contact', form, { skipAuth: true })
      setStatus('success')
    } catch (err) {
      setStatus('idle')

      if (err instanceof ApiError) {
        if (err.status === 422 && err.details?.length) {
          const errs = { ...INITIAL_ERRORS }
          err.details.forEach(({ field, message }) => { errs[field] = message })
          setFieldErrors(errs)
        } else {
          setGlobalError(err.message || 'Something went wrong. Please try again.')
        }
      } else {
        setGlobalError('Unable to connect. Check your internet connection.')
      }
    }
  }

  return { form, fieldErrors, globalError, status, update, handleSubmit }
}
