import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'Deep Dives',
  description: 'Long-form research series exploring the structural forces shaping global finance and economics.',
}

const SERIES = [
  {
    icon: '🏦',
    label: 'Series · 8 Parts',
    title: 'The Future of Central Banking',
    desc: 'How rising debt, inflation volatility, and political pressure are reshaping the role of central banks worldwide.',
    count: '8 articles · 120 min total',
    href: '#',
  },
  {
    icon: '🌍',
    label: 'Series · 6 Parts',
    title: 'EM Debt: A Complete History',
    desc: 'From Brady bonds to Eurobonds — how emerging markets have evolved, defaulted, and recovered over five decades.',
    count: '6 articles · 95 min total',
    href: '#',
  },
  {
    icon: '⚡',
    label: 'Series · 5 Parts',
    title: 'The Energy Transition & Markets',
    desc: 'Capital flows, commodity disruption, and the investment landscape as the world decarbonises at different speeds.',
    count: '5 articles · 80 min total',
    href: '#',
  },
  {
    icon: '🤖',
    label: 'Series · 4 Parts',
    title: 'AI & the Macroeconomy',
    desc: 'Productivity paradox, labour market disruption, and what AI means for potential GDP in the next decade.',
    count: '4 articles · 70 min total',
    href: '#',
  },
  {
    icon: '🔗',
    label: 'Series · 7 Parts',
    title: 'Dollar Dominance: The Full Picture',
    desc: 'The geopolitics of reserve currency status, SWIFT sanctions, and the road to a multipolar monetary order.',
    count: '7 articles · 110 min total',
    href: '#',
  },
  {
    icon: '🏙️',
    label: 'Series · 5 Parts',
    title: 'China\'s Economic Model',
    desc: 'State capitalism, property deleveraging, and how Beijing navigates the middle-income trap.',
    count: '5 articles · 85 min total',
    href: '#',
  },
]

const FEATURED = {
  tag: 'Deep Dive · Featured',
  title: 'The Debt Supercycle: How We Got Here and What Comes Next',
  excerpt: 'Global public and private debt has reached $313 trillion — a historic peak. This six-part investigation maps the architecture of modern debt, examines the structural forces that built it, and asks which of the four historical resolution paths awaits the global economy.',
  meta: 'By James Okafor & Sarah Chen · Jun 2026 · 45 min read',
  href: ROUTES.ARTICLE('debt-supercycle-investigation'),
}

export default function DeepDivesPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>Deep Dives</span>
              <h1 className={styles.heading}>Research Worth Your Time</h1>
              <p className={styles.sub}>
                Long-form series exploring the structural forces that shape finance,
                economics, and global markets. Written for professionals who want depth,
                not just data.
              </p>
            </div>
          </FadeIn>

          {/* Featured */}
          <FadeIn direction="up" delay={0.1}>
            <Link href={FEATURED.href} className={styles.featuredCard}>
              <div className={styles.featuredBody}>
                <span className={styles.featuredTag}>{FEATURED.tag}</span>
                <h2 className={styles.featuredTitle}>{FEATURED.title}</h2>
                <p className={styles.featuredExcerpt}>{FEATURED.excerpt}</p>
                <span className={styles.featuredMeta}>{FEATURED.meta}</span>
              </div>
              <div className={styles.featuredVisual} aria-hidden="true">📊</div>
            </Link>
          </FadeIn>

          {/* Series grid */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Research Series</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.seriesGrid} stagger={0.07}>
            {SERIES.map((s) => (
              <StaggerItem key={s.title}>
                <Link href={s.href} className={styles.seriesCard}>
                  <span className={styles.seriesIcon}>{s.icon}</span>
                  <span className={styles.seriesLabel}>{s.label}</span>
                  <h3 className={styles.seriesTitle}>{s.title}</h3>
                  <p className={styles.seriesDesc}>{s.desc}</p>
                  <span className={styles.seriesCount}>{s.count}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </div>
    </PageLayout>
  )
}
