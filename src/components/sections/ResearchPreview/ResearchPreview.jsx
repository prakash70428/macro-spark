import Link from 'next/link'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import { ROUTES } from '@/constants/routes'
import styles from './ResearchPreview.module.scss'

const FEATURED = {
  tag: 'Monetary Policy',
  headline: 'Fed Holds Rates Steady — But Hawks Are Circling',
  excerpt:
    'The Federal Reserve kept its benchmark rate at 5.25–5.5% for the fourth consecutive meeting, but dissenting voices within the FOMC signal a shift in risk appetite that markets have yet to fully price in.',
  author: 'Sarah Chen, Senior Economist',
  readTime: '6 min read',
  date: 'Jun 23, 2026',
  href: '/analysis/fed-holds-rates',
}

const SECONDARY = [
  {
    tag: 'Emerging Markets',
    headline: 'EM Rally Driven by Dollar Weakness, Not Fundamentals',
    author: 'James Okafor',
    readTime: '4 min',
    date: 'Jun 23',
    href: '/analysis/em-rally',
  },
  {
    tag: 'Fixed Income',
    headline: 'UK Gilt Yields Hit 3-Month High on GDP Surprise',
    author: 'Priya Sharma',
    readTime: '5 min',
    date: 'Jun 22',
    href: '/analysis/uk-gilts',
  },
  {
    tag: 'Commodities',
    headline: 'Gold Consolidates Gains as Real Yields Soften',
    author: 'Marco Rossi',
    readTime: '3 min',
    date: 'Jun 22',
    href: '/analysis/gold-yields',
  },
]

export default function ResearchPreview() {
  return (
    <section className={styles.section} aria-labelledby="research-heading">
      <Container>
        <FadeIn direction="up">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.eyebrow}>Latest Research</span>
              <h2 id="research-heading" className={styles.heading}>
                What&apos;s Moving Markets
              </h2>
            </div>
            <Button as={Link} href={ROUTES.ARTICLES} variant="secondary" size="sm">
              View all analysis →
            </Button>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {/* Featured */}
          <div className={styles.featured}>
            <FadeIn direction="up" delay={0.1}>
              <Link href={FEATURED.href} className={styles.featuredCard}>
                <div className={styles.featuredImage}>
                  <span className={styles.featuredTag}>{FEATURED.tag}</span>
                </div>
                <div className={styles.featuredBody}>
                  <h3 className={styles.featuredHeadline}>{FEATURED.headline}</h3>
                  <p className={styles.featuredExcerpt}>{FEATURED.excerpt}</p>
                  <div className={styles.featuredMeta}>
                    <span className={styles.author}>{FEATURED.author}</span>
                    <div className={styles.readMeta}>
                      <span className={styles.readTime}>{FEATURED.readTime}</span>
                      <span className={styles.date}>{FEATURED.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>

          {/* Secondary articles */}
          <StaggerList as="div" stagger={0.1}>
            {SECONDARY.map((article, i) => (
              <StaggerItem key={article.href}>
                <Link href={article.href} className={styles.secondaryCard}>
                  <span className={styles.secondaryIndex} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className={styles.secondaryBody}>
                    <span className={styles.secondaryTag}>{article.tag}</span>
                    <h3 className={styles.secondaryHeadline}>{article.headline}</h3>
                    <span className={styles.secondaryMeta}>
                      {article.author} · {article.readTime} · {article.date}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>

        <div className={styles.cta}>
          <Button as={Link} href={ROUTES.ARTICLES} variant="secondary" size="lg">
            Browse all research
          </Button>
        </div>
      </Container>
    </section>
  )
}
