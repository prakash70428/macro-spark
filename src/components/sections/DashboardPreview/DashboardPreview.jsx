import Link from 'next/link'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import { ROUTES } from '@/constants/routes'
import styles from './DashboardPreview.module.scss'

const FEATURES = [
  {
    icon: '📊',
    title: 'Real-time market data',
    desc: 'Live prices, yields, forex, and commodity feeds across 40+ asset classes.',
  },
  {
    icon: '🔍',
    title: 'Deep-dive research',
    desc: 'Analyst-authored reports with proprietary data models and scenario analysis.',
  },
  {
    icon: '⚡',
    title: 'Instant alerts',
    desc: 'Set price and macro event triggers. Never miss a market-moving development.',
  },
]

const NAV_ITEMS = ['About', 'Blogs', 'Articles', 'Research', 'Quant Projects']

const METRICS = [
  { label: 'S&P 500',  value: '5,482', change: '+0.82%', pos: true  },
  { label: 'US 10Y',   value: '4.31%', change: '−3bp',   pos: false },
  { label: 'Gold',     value: '$2,341', change: '+0.54%', pos: true  },
]

const BAR_HEIGHTS = [35, 50, 42, 65, 55, 80, 60, 75, 58, 90, 70, 85, 62, 78, 95]

const FEED = [
  { text: 'Fed Chair Powell speaks at 14:30 ET',   time: '2m ago' },
  { text: 'UK CPI data beats consensus at 2.3%',   time: '18m ago' },
  { text: 'ECB minutes: rate cut signals soften',   time: '1h ago' },
]

export default function DashboardPreview() {
  return (
    <section className={styles.section} aria-labelledby="dashboard-heading">
      <Container size="wide">
        <div className={styles.layout}>
          {/* Text side */}
          <FadeIn direction="up">
            <div className={styles.text}>
              <span className={styles.eyebrow}>The Platform</span>
              <h2 id="dashboard-heading" className={styles.heading}>
                Everything in one workspace
              </h2>
              <p className={styles.body}>
                MacroSpark brings together live market data, research, and macro intelligence
                so you stop tab-switching and start thinking.
              </p>

              <div className={styles.features}>
                {FEATURES.map((f) => (
                  <div key={f.title} className={styles.feature}>
                    <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                    <div className={styles.featureText}>
                      <span className={styles.featureTitle}>{f.title}</span>
                      <span className={styles.featureDesc}>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="lg">
                Try the platform free
              </Button>
            </div>
          </FadeIn>

          {/* Dashboard mockup */}
          <FadeIn direction="up" delay={0.15} duration="slow">
            <div className={styles.mockup} aria-hidden="true">
              <div className={styles.mockupWindow}>
                {/* Window chrome */}
                <div className={styles.windowBar}>
                  <div className={styles.windowDot} />
                  <div className={styles.windowDot} />
                  <div className={styles.windowDot} />
                  <div className={styles.windowUrl}>
                    <span className={styles.urlText}>app.macrospark.com/dashboard</span>
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className={styles.dashContent}>
                  {/* Sidebar */}
                  <div className={styles.dashSidebar}>
                    <div className={styles.dashLogo}>MacroSpark</div>
                    {NAV_ITEMS.map((item, i) => (
                      <div key={item} className={`${styles.dashNavItem} ${i === 0 ? styles.active : ''}`}>
                        <span className={styles.navDot} />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main area */}
                  <div className={styles.dashMain}>
                    {/* Metrics row */}
                    <div className={styles.dashTopRow}>
                      {METRICS.map((m) => (
                        <div key={m.label} className={styles.dashMetric}>
                          <span className={styles.dashMetricLabel}>{m.label}</span>
                          <span className={styles.dashMetricValue}>{m.value}</span>
                          <span className={`${styles.dashMetricChange} ${m.pos ? styles.pos : styles.neg}`}>
                            {m.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className={styles.dashChart}>
                      <div className={styles.dashChartHeader}>
                        <span className={styles.dashChartTitle}>S&amp;P 500 — 30D</span>
                        <span className={styles.dashChartPeriod}>1M ▾</span>
                      </div>
                      <div className={styles.chartBars}>
                        {BAR_HEIGHTS.map((h, i) => (
                          <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>

                    {/* Feed */}
                    <div className={styles.dashFeed}>
                      {FEED.map((item) => (
                        <div key={item.text} className={styles.dashFeedItem}>
                          <div className={styles.feedDot} />
                          <span className={styles.feedText}>{item.text}</span>
                          <span className={styles.feedTime}>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
