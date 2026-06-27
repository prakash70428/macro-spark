import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './page.module.scss'

export const metadata = {
  title: 'Financial Literacy',
  description: 'Build your knowledge of markets, economics, and finance — from first principles to advanced frameworks.',
}

const TRACKS = [
  {
    icon: '📘', level: 'beginner', levelLabel: 'Beginner',
    title: 'Markets 101',
    desc: 'How stock exchanges work, what drives prices, and how to read a financial news article.',
    lessons: '8 lessons', duration: '45 min',
    href: '#',
  },
  {
    icon: '📊', level: 'beginner', levelLabel: 'Beginner',
    title: 'Understanding Economic Reports',
    desc: 'CPI, GDP, NFP — what they mean, how they\'re calculated, and why markets react.',
    lessons: '6 lessons', duration: '35 min',
    href: '#',
  },
  {
    icon: '🏦', level: 'intermediate', levelLabel: 'Intermediate',
    title: 'Central Banks Explained',
    desc: 'How monetary policy works, what the yield curve tells us, and how to interpret Fed statements.',
    lessons: '10 lessons', duration: '60 min',
    href: '#',
  },
  {
    icon: '🌐', level: 'intermediate', levelLabel: 'Intermediate',
    title: 'Fixed Income Fundamentals',
    desc: 'Bond pricing, duration, credit spreads, and how the fixed income market dwarfs equities.',
    lessons: '12 lessons', duration: '75 min',
    href: '#',
  },
  {
    icon: '⚖️', level: 'advanced', levelLabel: 'Advanced',
    title: 'Derivatives & Risk Management',
    desc: 'Options pricing, delta hedging, VaR — the tools used by professional risk managers.',
    lessons: '15 lessons', duration: '90 min',
    href: '#',
  },
  {
    icon: '🔬', level: 'advanced', levelLabel: 'Advanced',
    title: 'Macro Framework for Investors',
    desc: 'Build a top-down macro framework: growth/inflation quadrant, credit cycles, and regime identification.',
    lessons: '14 lessons', duration: '85 min',
    href: '#',
  },
]

export default function FinancialLiteracyPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>Financial Literacy</span>
              <h1 className={styles.heading}>From First Principles to Expert</h1>
              <p className={styles.sub}>
                Structured learning tracks that take you from understanding the basics
                to reading markets like a professional. Self-paced, jargon-explained.
              </p>
            </div>
          </FadeIn>

          {/* Level filters */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.levels}>
              <span className={`${styles.level} ${styles.beginner} ${styles.active}`}>All</span>
              <span className={`${styles.level} ${styles.beginner}`}>Beginner</span>
              <span className={`${styles.level} ${styles.intermediate}`}>Intermediate</span>
              <span className={`${styles.level} ${styles.advanced}`}>Advanced</span>
            </div>
          </FadeIn>

          {/* Track grid */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Learning Tracks</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.grid} stagger={0.07}>
            {TRACKS.map((track) => (
              <StaggerItem key={track.title}>
                <Link href={track.href} className={styles.track}>
                  <span className={styles.trackIcon}>{track.icon}</span>
                  <span className={`${styles.trackLevel} ${styles[track.level]}`}>{track.levelLabel}</span>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <p className={styles.trackDesc}>{track.desc}</p>
                  <div className={styles.trackMeta}>
                    <span>{track.lessons}</span>
                    <span>·</span>
                    <span>{track.duration}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>

          {/* Glossary CTA */}
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.glossaryBanner}>
              <div className={styles.glossaryText}>
                <h2 className={styles.glossaryTitle}>MacroSpark Financial Glossary</h2>
                <p className={styles.glossaryDesc}>
                  800+ terms defined — from alpha to yield spread — with context on how each term
                  is actually used by market professionals.
                </p>
              </div>
              <Button as={Link} href="#" variant="secondary" size="md">
                Browse glossary →
              </Button>
            </div>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
