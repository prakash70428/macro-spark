import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'Markets',
  description: 'Real-time market data, global indices, FX rates, commodities, and sector performance.',
}

const SUMMARY = [
  { label: 'S&P 500',      value: '5,482.32', change: '+0.82%', positive: true  },
  { label: 'NASDAQ',       value: '17,741.65', change: '+1.14%', positive: true  },
  { label: 'FTSE 100',     value: '8,214.44', change: '−0.31%', positive: false },
  { label: '10Y US Yield', value: '4.312%',   change: '−3bp',   positive: false },
]

const EQUITIES = [
  { ticker: 'AAPL', name: 'Apple Inc.',       price: '196.45', change: '+1.23%', mktCap: '$2.98T', positive: true  },
  { ticker: 'MSFT', name: 'Microsoft Corp.',  price: '441.78', change: '+0.68%', mktCap: '$3.28T', positive: true  },
  { ticker: 'NVDA', name: 'NVIDIA Corp.',     price: '1,208.40', change: '+2.91%', mktCap: '$1.48T', positive: true  },
  { ticker: 'GOOGL', name: 'Alphabet Inc.',   price: '183.21', change: '−0.44%', mktCap: '$2.24T', positive: false },
  { ticker: 'AMZN', name: 'Amazon.com',       price: '198.77', change: '+0.99%', mktCap: '$2.08T', positive: true  },
  { ticker: 'META', name: 'Meta Platforms',   price: '538.14', change: '+1.72%', mktCap: '$1.36T', positive: true  },
  { ticker: 'TSLA', name: 'Tesla Inc.',       price: '182.63', change: '−2.14%', mktCap: '$582B',  positive: false },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway', price: '421.50', change: '+0.18%', mktCap: '$918B', positive: true },
]

const FX = [
  { pair: 'EUR/USD', rate: '1.0847', change: '+0.12%', positive: true  },
  { pair: 'GBP/USD', rate: '1.2741', change: '+0.08%', positive: true  },
  { pair: 'USD/JPY', rate: '157.43', change: '−0.22%', positive: false },
  { pair: 'USD/CHF', rate: '0.8921', change: '−0.06%', positive: false },
  { pair: 'AUD/USD', rate: '0.6612', change: '+0.31%', positive: true  },
  { pair: 'USD/CAD', rate: '1.3688', change: '+0.04%', positive: true  },
]

const COMMODITIES = [
  { name: 'Gold',       price: '$2,341/oz', change: '+0.54%', positive: true  },
  { name: 'Silver',     price: '$29.84/oz', change: '+0.91%', positive: true  },
  { name: 'WTI Crude',  price: '$78.43/bbl', change: '−0.68%', positive: false },
  { name: 'Brent',      price: '$82.17/bbl', change: '−0.55%', positive: false },
  { name: 'Natural Gas', price: '$2.41/MMBtu', change: '+1.22%', positive: true },
  { name: 'Copper',     price: '$4.52/lb', change: '+0.33%', positive: true  },
]

// Slugs match ARTICLES in src/lib/research.js
const MARKET_NEWS = [
  {
    tag: 'Monetary Policy',
    headline: 'Fed Holds Rates Steady — But Hawks Are Circling',
    meta: 'Jun 23, 2026 · 6 min read',
    href: ROUTES.ARTICLE('fed-holds-rates-hawks-circling'),
  },
  {
    tag: 'Emerging Markets',
    headline: 'EM Rally Driven by Dollar Weakness, Not Fundamentals',
    meta: 'Jun 23, 2026 · 4 min read',
    href: ROUTES.ARTICLE('em-rally-dollar-weakness'),
  },
  {
    tag: 'Fixed Income',
    headline: 'UK Gilt Yields Hit 3-Month High on GDP Surprise',
    meta: 'Jun 22, 2026 · 5 min read',
    href: ROUTES.ARTICLE('uk-gilts-gdp-surprise'),
  },
  {
    tag: 'Commodities',
    headline: 'Gold Consolidates as Real Yields Soften',
    meta: 'Jun 22, 2026 · 3 min read',
    href: ROUTES.ARTICLE('gold-real-yields-consolidation'),
  },
  {
    tag: 'Equities',
    headline: 'NVIDIA and the AI Capex Cycle: Is the Market Pricing in Too Much?',
    meta: 'Jun 20, 2026 · 10 min read',
    href: ROUTES.ARTICLE('nvidia-ai-capex-cycle'),
  },
  {
    tag: 'FX',
    headline: "Japan's FX Intervention Risk Is Rising — Here's the Threshold",
    meta: 'Jun 20, 2026 · 4 min read',
    href: ROUTES.ARTICLE('japan-yen-intervention-risk'),
  },
]

export default function MarketsPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>Markets Intelligence</span>
              <h1 className={styles.heading}>Global Markets Overview</h1>
              <p className={styles.sub}>
                Real-time snapshot of global equities, FX, fixed income, and commodities.
                Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC
              </p>
            </div>
          </FadeIn>

          {/* Summary strip */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.strip}>
              {SUMMARY.map((item) => (
                <div key={item.label} className={styles.stripCard}>
                  <span className={styles.stripLabel}>{item.label}</span>
                  <span className={styles.stripValue}>{item.value}</span>
                  <span className={`${styles.stripChange} ${item.positive ? styles.positive : styles.negative}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Equities table */}
          <FadeIn direction="up" delay={0.15}>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>Top Equities</h2>
              <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>Ticker</th>
                    <th>Name</th>
                    <th>Price (USD)</th>
                    <th>Change</th>
                    <th>Mkt Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {EQUITIES.map((eq) => (
                    <tr key={eq.ticker} className={styles.row}>
                      <td className={`${styles.cell} ${styles.ticker}`}>{eq.ticker}</td>
                      <td className={styles.cell}>{eq.name}</td>
                      <td className={`${styles.cell} ${styles.right}`}>{eq.price}</td>
                      <td className={`${styles.cell} ${eq.positive ? styles.positive : styles.negative}`}>
                        {eq.change}
                      </td>
                      <td className={`${styles.cell} ${styles.right}`}>{eq.mktCap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <p className={styles.tableScrollHint}>Scroll to see more</p>
            </div>
          </FadeIn>

          {/* FX table */}
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>Foreign Exchange</h2>
              <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>Pair</th>
                    <th>Rate</th>
                    <th>Change (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {FX.map((fx) => (
                    <tr key={fx.pair} className={styles.row}>
                      <td className={`${styles.cell} ${styles.ticker}`}>{fx.pair}</td>
                      <td className={`${styles.cell} ${styles.right}`}>{fx.rate}</td>
                      <td className={`${styles.cell} ${fx.positive ? styles.positive : styles.negative}`}>
                        {fx.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <p className={styles.tableScrollHint}>Scroll to see more</p>
            </div>
          </FadeIn>

          {/* Commodities table */}
          <FadeIn direction="up" delay={0.25}>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>Commodities</h2>
              <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>Change (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMODITIES.map((c) => (
                    <tr key={c.name} className={styles.row}>
                      <td className={styles.cell}>{c.name}</td>
                      <td className={`${styles.cell} ${styles.right}`}>{c.price}</td>
                      <td className={`${styles.cell} ${c.positive ? styles.positive : styles.negative}`}>
                        {c.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <p className={styles.tableScrollHint}>Scroll to see more</p>
            </div>
          </FadeIn>

          {/* Market News */}
          <FadeIn direction="up" delay={0.3}>
            <h2 className={styles.sectionTitle}>Market News</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.newsGrid} stagger={0.06}>
            {MARKET_NEWS.map((item) => (
              <StaggerItem key={item.href}>
                <Link href={item.href} className={styles.newsCard}>
                  <span className={styles.newsTag}>{item.tag}</span>
                  <span className={styles.newsHeadline}>{item.headline}</span>
                  <span className={styles.newsMeta}>{item.meta}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </div>
    </PageLayout>
  )
}
