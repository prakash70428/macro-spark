import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import NewsletterSignupForm from './NewsletterSignupForm'
import styles from './page.module.scss'

export const metadata = {
  title: 'Newsletter',
  description: 'The MacroSpark Weekly — markets, macro, and global economics. Free, every Sunday.',
}

const PROOF = [
  { value: '40,000+', label: 'Active readers' },
  { value: '214', label: 'Editions published' },
  { value: '4.9★', label: 'Average rating' },
  { value: 'Free', label: 'Always' },
]

const ARCHIVE = [
  { title: '#214 — The Dollar Dilemma', date: 'Jun 22, 2026', href: '#' },
  { title: "#213 — ECB's Impossible Triangle", date: 'Jun 15, 2026', href: '#' },
  { title: '#212 — China Property: End Game?', date: 'Jun 8, 2026', href: '#' },
  { title: '#211 — Carry Trades & Currency Crises', date: 'Jun 1, 2026', href: '#' },
  { title: '#210 — EM Debt in a Higher-for-Longer World', date: 'May 25, 2026', href: '#' },
  { title: '#209 — AI, Productivity, and the Output Gap', date: 'May 18, 2026', href: '#' },
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
                Every Sunday, 40,000+ professionals read the MacroSpark Weekly for sharp takes on
                markets, policy, and global economics. No ads. No fluff. Just signal.
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

          {/* Archive */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Recent Editions</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.archive} stagger={0.06}>
            {ARCHIVE.map((ed) => (
              <StaggerItem key={ed.href + ed.title}>
                <Link href={ed.href} className={styles.edition}>
                  <div className={styles.editionInfo}>
                    <span className={styles.editionTitle}>{ed.title}</span>
                    <span className={styles.editionMeta}>{ed.date}</span>
                  </div>
                  <span className={styles.editionArrow}>→</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </div>
    </PageLayout>
  )
}
