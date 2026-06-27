import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './page.module.scss'

export const metadata = {
  title: 'Data Lab',
  description: 'Economic indicators, interactive charts, and downloadable datasets for finance professionals.',
}

const CATEGORIES = ['All', 'Macro', 'Inflation', 'Labour', 'Growth', 'Trade', 'Central Banks']

const INDICATORS = [
  { label: 'US CPI (YoY)',       value: '3.4%',   change: '−0.2pp vs prev',  positive: true,  source: 'BLS · May 2026'  },
  { label: 'US GDP Growth (QoQ)', value: '2.8%',  change: '+0.3pp vs prev',  positive: true,  source: 'BEA · Q1 2026'   },
  { label: 'US Unemployment',    value: '3.9%',   change: '+0.1pp vs prev',  positive: false, source: 'BLS · May 2026'  },
  { label: 'Fed Funds Rate',     value: '5.25%',  change: 'Unchanged',       positive: false, source: 'Fed · Jun 2026'  },
  { label: 'UK CPI (YoY)',       value: '2.3%',   change: '−0.4pp vs prev',  positive: true,  source: 'ONS · May 2026'  },
  { label: 'Euro Area GDP',      value: '0.4%',   change: '+0.1pp vs prev',  positive: true,  source: 'Eurostat · Q1 2026' },
  { label: 'China PMI (Mfg)',    value: '49.8',   change: '−0.3 vs prev',    positive: false, source: 'NBS · May 2026'  },
  { label: 'Japan CPI (YoY)',    value: '2.9%',   change: '+0.1pp vs prev',  positive: false, source: 'MIC · May 2026'  },
  { label: 'Global PMI Composite', value: '52.4', change: '+0.8 vs prev',    positive: true,  source: 'JPM · May 2026'  },
]

const DATASETS = [
  { name: 'G7 Inflation Monitor',      desc: 'Monthly CPI data across G7 economies since 2000',     badge: 'Free',      href: '#' },
  { name: 'Central Bank Rate Tracker', desc: 'Policy rate decisions from 24 central banks',          badge: 'Free',      href: '#' },
  { name: 'EM Capital Flows',          desc: 'Weekly fund flows into emerging market equities & bonds', badge: 'Subscriber', href: '#' },
  { name: 'US Yield Curve History',    desc: 'Daily treasury yield data from 1990–present',          badge: 'Subscriber', href: '#' },
  { name: 'Global PMI Dataset',        desc: 'Composite PMI readings for 40+ economies',             badge: 'Premium',   href: '#' },
  { name: 'Corporate Credit Spreads',  desc: 'IG and HY spread data across USD, EUR, GBP',          badge: 'Premium',   href: '#' },
]

export default function DataLabPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>Data Lab</span>
              <h1 className={styles.heading}>Economic Intelligence Centre</h1>
              <p className={styles.sub}>
                Key economic indicators, interactive charting tools, and downloadable
                datasets — all in one place for finance professionals.
              </p>
            </div>
          </FadeIn>

          {/* Category tabs */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.tabs}>
              {CATEGORIES.map((cat, i) => (
                <span key={cat} className={`${styles.tab} ${i === 0 ? styles.active : ''}`}>
                  {cat}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Indicators grid */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Key Indicators — June 2026</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.grid} stagger={0.05}>
            {INDICATORS.map((ind) => (
              <StaggerItem key={ind.label}>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>{ind.label}</span>
                  <span className={styles.cardValue}>{ind.value}</span>
                  <span className={`${styles.cardChange} ${ind.positive ? styles.positive : ind.change === 'Unchanged' ? styles.neutral : styles.negative}`}>
                    {ind.change}
                  </span>
                  <span className={styles.cardMeta}>{ind.source}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          {/* Chart placeholder */}
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.chartSection}>
              <h2 className={styles.sectionTitle}>US Yield Curve — Live View</h2>
              <div className={styles.chartPlaceholder}>
                <span className={styles.chartIcon}>📈</span>
                <span className={styles.chartLabel}>
                  Interactive chart — powered by Recharts (Sprint 6)
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Datasets */}
          <FadeIn direction="up" delay={0.25}>
            <h2 className={styles.sectionTitle}>Available Datasets</h2>
            <div className={styles.datasetList}>
              {DATASETS.map((ds) => (
                <Link key={ds.name} href={ds.href} className={styles.dataset}>
                  <div className={styles.datasetInfo}>
                    <span className={styles.datasetName}>{ds.name}</span>
                    <span className={styles.datasetDesc}>{ds.desc}</span>
                  </div>
                  <span className={styles.datasetBadge}>{ds.badge}</span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
