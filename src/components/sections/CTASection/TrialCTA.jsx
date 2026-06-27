import Link from 'next/link'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import { ROUTES } from '@/constants/routes'
import styles from './CTASection.module.scss'

export default function TrialCTA() {
  return (
    <section className={styles.trial} aria-labelledby="trial-heading">
      <div className={styles.trialBg} aria-hidden="true" />
      <Container>
        <FadeIn direction="up">
          <div className={styles.trialInner}>
            <h2 id="trial-heading" className={styles.trialHeading}>
              Ready to see markets clearly?
            </h2>
            <p className={styles.trialBody}>
              Start with full access, no credit card required. Upgrade when you&apos;re ready.
              Cancel anytime — we earn your trust every week.
            </p>
            <div className={styles.trialCtas}>
              <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="lg">
                Start free — no card needed
              </Button>
              <Button as={Link} href={ROUTES.ARTICLES} variant="secondary" size="lg">
                Read the research first
              </Button>
            </div>
            <p className={styles.trialNote}>
              Free plan includes 5 articles/month · Full access from $19/mo
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
