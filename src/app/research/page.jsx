import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './page.module.scss'

export const metadata = {
  title: 'Research Papers',
  description: 'Original research papers on macroeconomics, quantitative finance, and market structure published by MacroSpark.',
}

const PAPERS = [
  {
    title:    'Asymmetric Monetary Policy Transmission in Emerging Markets: Evidence from 2015–2024',
    abstract: 'We test whether contractionary and expansionary monetary policy shocks have asymmetric effects on output and inflation across 18 emerging market economies using a panel SVAR framework.',
    authors:  'MacroSpark Research',
    date:     'Jun 2026',
    pages:    34,
    tags:     ['Monetary Policy', 'Emerging Markets', 'SVAR'],
    pdf:      '/research/asymmetric-monetary-policy-em.pdf',
  },
  {
    title:    'Factor Crowding in Global Equities: Measuring Systemic Risk from Style Concentration',
    abstract: 'Using daily returns data across 45 equity markets, we construct a factor crowding index and demonstrate its predictive power for drawdown severity during risk-off episodes.',
    authors:  'MacroSpark Research',
    date:     'May 2026',
    pages:    28,
    tags:     ['Equities', 'Factor Investing', 'Systemic Risk'],
    pdf:      '/research/factor-crowding-global-equities.pdf',
  },
  {
    title:    'Interest Rate Volatility and Corporate Investment: A Cross-Country Panel Study',
    abstract: 'We document a robust negative relationship between interest rate volatility and corporate capital expenditure across 32 OECD economies, with larger effects in high-leverage sectors.',
    authors:  'MacroSpark Research',
    date:     'Apr 2026',
    pages:    41,
    tags:     ['Fixed Income', 'Corporate Finance', 'Panel Data'],
    pdf:      '/research/rate-volatility-corporate-investment.pdf',
  },
  {
    title:    'Commodity Currency Dynamics in a Fragmented Trade World',
    abstract: 'Post-2022 trade fragmentation has broken classical commodity currency relationships. We re-estimate exchange rate sensitivities for AUD, CAD, NOK, and BRL under the new trade regime.',
    authors:  'MacroSpark Research',
    date:     'Mar 2026',
    pages:    25,
    tags:     ['FX', 'Commodities', 'Trade'],
    pdf:      '/research/commodity-currency-fragmented-trade.pdf',
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
                Original research on macroeconomics, quantitative finance, and market structure.
                All papers are free to read and download.
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
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <span className={styles.meta}>{paper.date} · {paper.pages} pages</span>
                  </div>

                  <h2 className={styles.cardTitle}>{paper.title}</h2>

                  <div className={styles.abstractBlock}>
                    <span className={styles.abstractLabel}>Abstract</span>
                    <p className={styles.abstract}>{paper.abstract}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.authors}>{paper.authors}</span>
                    <a
                      href={paper.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnPdf}
                      aria-label={`Download paper: ${paper.title}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download PDF
                    </a>
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
