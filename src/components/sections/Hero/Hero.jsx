import Link from 'next/link'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import { ROUTES } from '@/constants/routes'
import styles from './Hero.module.scss'

const FLOATING_PILLS = [
  { label: 'S&P 500', value: '5,482.32', change: '+0.82%', positive: true },
  { label: '10Y US Yield', value: '4.312%', change: '−3bp', positive: false },
  { label: 'Gold', value: '$2,341', change: '+0.54%', positive: true },
]

const TRUST_ITEMS = ['Real-time data', '500+ analysts', 'No paywalled noise']

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Background */}
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.bgGradient} aria-hidden="true" />

      {/* Floating market pills — desktop only */}
      <div className={styles.dataPill} aria-hidden="true">
        {FLOATING_PILLS.map((p) => (
          <div key={p.label} className={styles.pill}>
            <span className={styles.pillLabel}>{p.label}</span>
            <span className={styles.pillValue}>{p.value}</span>
            <span
              className={`${styles.pillChange} ${p.positive ? styles.positive : styles.negative}`}
            >
              {p.change}
            </span>
          </div>
        ))}
      </div>

      <Container>
        <div className={styles.content}>
          <FadeIn direction="up" delay={0.1} duration="slow">
            <p className={styles.eyebrow}>Markets Intelligence Platform</p>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} duration="slow">
            <h1 className={styles.heading}>
              Finance &amp; Markets, <em>Understood.</em>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} duration="slow">
            <p className={styles.sub}>
              In-depth research, real-time data, and expert commentary for professionals who need
              clarity in a noisy world.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className={styles.ctas}>
              <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="lg">
                Start for free
              </Button>
              <Button as={Link} href={ROUTES.ARTICLES} variant="ghost" size="lg">
                Read latest analysis →
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <div className={styles.trust}>
              {TRUST_ITEMS.map((item) => (
                <div key={item} className={styles.trustItem}>
                  <span className={styles.trustDot} aria-hidden="true" />
                  <span className={styles.trustLabel}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
