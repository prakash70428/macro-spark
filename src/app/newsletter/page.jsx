import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import NewsletterSignupForm from './NewsletterSignupForm'
import styles from './page.module.scss'

export const metadata = {
  title: 'Newsletter',
  description: 'The MacroSpark Weekly — markets, macro, and global economics. Free, every Sunday.',
}

const PROOF = [
  { value: 'Weekly', label: 'Every Sunday' },
  { value: 'Free', label: 'Always' },
  { value: 'No spam', label: 'Unsubscribe any time' },
  { value: 'Independent', label: 'No advertiser influence' },
]

export default function NewsletterPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Hero */}
          <FadeIn direction="up">
            <div className={styles.hero}>
              <span className={styles.eyebrow}>MacroSpark Weekly</span>
              <h1 className={styles.heading}>Your Sunday Morning Edge</h1>
              <p className={styles.sub}>
                Every Sunday, the MacroSpark Weekly delivers sharp takes on markets, policy, and
                global economics. No ads. No fluff. Just signal.
              </p>
              <NewsletterSignupForm />
              <p className={styles.privacy}>Free forever · No spam · Unsubscribe any time</p>
            </div>
          </FadeIn>

          {/* Social proof */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.proof}>
              {PROOF.map((p) => (
                <div key={p.label} className={styles.proofStat}>
                  <span className={styles.proofValue}>{p.value}</span>
                  <span className={styles.proofLabel}>{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
