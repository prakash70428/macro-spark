import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'Research Papers',
  description:
    'Original research papers on macroeconomics, quantitative finance, and market structure published by MacroSpark.',
}

const PAPERS = [
  {
    title:
      "How Interest Rate Cycles Affect Small-Cap IPO Performance: A Quantitative Study of India's Primary Markets (2018–2024)",
    abstract:
      'A quantitative study of small-cap IPOs on the NSE and BSE from 2018-2024, using correlation and linear regression to test how the RBI repo rate at time of issue relates to listing-day gains and 30-day post-listing returns.',
    authors: 'Arnav Mangla',
    date: 'Jul 2025',
    pages: 11,
    tags: ['IPOs', 'Monetary Policy', 'Indian Equity Markets'],
    pdf: '/research/interest-rate-cycles-small-cap-ipo-india.pdf',
    labTool: ROUTES.LABS_TOOL('ipo-performance-analyzer'),
  },
  {
    title:
      'Narrative-Driven Markets: Artificial Intelligence Optimism, Retail Investor Behaviour, and Sectoral Equity Performance in India (2022–2025)',
    abstract:
      'A quantitative study examining the extent to which AI-related market optimism and retail investor sentiment affected sectoral stock performance in Indian equity markets between 2022 and 2025, using comparative return analysis against the NIFTY 50 and an original AI Narrative Intensity framework.',
    authors: 'Arnav Mangla',
    date: 'Aug 2026',
    pages: 26,
    tags: ['Artificial Intelligence', 'Behavioral Finance', 'Indian Equity Markets'],
    pdf: '/research/narrative-driven-markets-ai-optimism-india.pdf',
  },
  {
    title: 'Asymmetric Monetary Policy Transmission in Emerging Markets: A Local Projections Approach',
    abstract:
      'We test whether contractionary and expansionary monetary policy shocks transmit to output with equal magnitude, using a local projections framework applied to a compiled panel dataset. Contractionary shocks show a growth response roughly 2.4x larger than expansionary shocks of equal size.',
    authors: 'MacroSpark Research',
    date: 'Aug 2026',
    pages: 3,
    tags: ['Monetary Policy', 'Emerging Markets', 'Local Projections'],
    pdf: '/research/asymmetric-monetary-policy-em.pdf',
  },
  {
    title:
      'Factor Crowding in Global Equities: A Correlation-Based Crowding Index and Its Relationship to Drawdown Severity',
    abstract:
      'We construct a factor crowding index from the rolling cross-correlation of major style-factor returns and test its relationship to subsequent drawdown severity, finding a statistically significant negative relationship (R² = 0.42).',
    authors: 'MacroSpark Research',
    date: 'Aug 2026',
    pages: 2,
    tags: ['Equities', 'Factor Investing', 'Systemic Risk'],
    pdf: '/research/factor-crowding-global-equities.pdf',
  },
  {
    title: 'Interest Rate Volatility and Corporate Investment: Evidence from a Cross-Country Panel',
    abstract:
      'We document a negative relationship between interest rate volatility and corporate capital expenditure growth, with a materially larger effect in high-leverage subsamples (β = -4.85, R² = 0.68) than low-leverage subsamples (β = -3.27, R² = 0.46).',
    authors: 'MacroSpark Research',
    date: 'Aug 2026',
    pages: 2,
    tags: ['Fixed Income', 'Corporate Finance', 'Panel Data'],
    pdf: '/research/rate-volatility-corporate-investment.pdf',
  },
  {
    title: 'Commodity Currency Dynamics in a Fragmented Trade World',
    abstract:
      'Post-2022 trade fragmentation plausibly weakens the historical relationship between commodity prices and commodity-exporting currencies. We re-estimate FX betas to a broad commodity index for AUD, CAD, NOK, and BRL across pre- and post-2022 windows and find a decline in beta across all four currencies.',
    authors: 'MacroSpark Research',
    date: 'Aug 2026',
    pages: 2,
    tags: ['FX', 'Commodities', 'Trade'],
    pdf: '/research/commodity-currency-fragmented-trade.pdf',
  },
]

export default function ResearchPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Research</span>
              <h1 className={styles.heading}>Research Papers</h1>
              <p className={styles.sub}>
                Original research on macroeconomics, quantitative finance, and market structure. All
                papers are free to read and download.
              </p>
            </div>
          </FadeIn>

          {/* Papers */}
          <StaggerList as="div" className={styles.list} stagger={0.08}>
            {PAPERS.map((paper) => (
              <StaggerItem key={paper.title}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.tags}>
                      {paper.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={styles.meta}>
                      {paper.date} · {paper.pages} pages
                    </span>
                  </div>

                  <h2 className={styles.cardTitle}>{paper.title}</h2>

                  <div className={styles.abstractBlock}>
                    <span className={styles.abstractLabel}>Abstract</span>
                    <p className={styles.abstract}>{paper.abstract}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.authors}>{paper.authors}</span>
                    <div className={styles.footerActions}>
                      {paper.labTool && (
                        <Link href={paper.labTool} className={styles.btnTool}>
                          Try the interactive analysis →
                        </Link>
                      )}
                      <a
                        href={paper.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnPdf}
                        aria-label={`Download paper: ${paper.title}`}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </div>
    </PageLayout>
  )
}
