'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import styles from './CTASection.module.scss'

const PERKS = [
  'Weekly macro briefing — every Sunday',
  'Breaking market alerts direct to inbox',
  'Exclusive analyst deep-dives',
  'No spam. Unsubscribe anytime.',
]

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-heading">
      <Container>
        <div className={styles.newsletterInner}>
          <FadeIn direction="up">
            <div className={styles.newsletterText}>
              <span className={styles.eyebrow}>Free weekly briefing</span>
              <h2 id="newsletter-heading" className={styles.heading}>
                Stay ahead of the market
              </h2>
              <p className={styles.body}>
                Join 40,000+ professionals who read MacroSpark every week.
                Concise, expert, and always signal over noise.
              </p>
              <div className={styles.perks}>
                {PERKS.map((p) => (
                  <div key={p} className={styles.perk}>
                    <div className={styles.perkCheck} aria-hidden="true">✓</div>
                    <span className={styles.perkText}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            {status === 'success' ? (
              <div className={styles.successBox} role="status">
                <span className={styles.successIcon}>✓</span>
                <h3 className={styles.successHeading}>You&apos;re subscribed!</h3>
                <p className={styles.successBody}>
                  Check your inbox for the welcome email. First briefing arrives Sunday.
                </p>
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="nl-name" className={styles.formLabel}>First name</label>
                  <input
                    id="nl-name"
                    type="text"
                    className={styles.input}
                    placeholder="Arnav"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="nl-email" className={styles.formLabel}>Work email</label>
                  <input
                    id="nl-email"
                    type="email"
                    className={styles.input}
                    placeholder="arnav@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.submitRow}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={status === 'loading'}
                  >
                    Subscribe free
                  </Button>
                  <span className={styles.privacy}>No credit card. No spam.</span>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
