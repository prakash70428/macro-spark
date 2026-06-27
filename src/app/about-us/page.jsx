import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './page.module.scss'

export const metadata = {
  title: 'About MacroSpark',
  description: 'MacroSpark is an independent finance and economics intelligence platform built for serious readers, researchers, and quantitative thinkers.',
}

const VALUES = [
  {
    title: 'Rigour over noise',
    body:  'Every piece we publish is grounded in data, methodology, and honest uncertainty. We do not chase headlines.',
  },
  {
    title: 'Independence',
    body:  'No institutional backing. No advertiser pressure. Our analysis serves the reader — no one else.',
  },
  {
    title: 'Transparency',
    body:  'We show our work. Data sources, assumptions, and limitations are always disclosed.',
  },
  {
    title: 'Accessibility',
    body:  'Institutional-grade research does not have to live behind paywalls. MacroSpark is free.',
  },
]

const WHAT_WE_COVER = [
  'Macroeconomics & monetary policy',
  'Global equity markets',
  'Fixed income & credit',
  'Foreign exchange',
  'Commodities',
  'Quantitative finance & Python modelling',
  'Emerging market dynamics',
  'Geopolitical risk & trade',
]

export default function AboutUsPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>

          {/* Hero */}
          <FadeIn direction="up">
            <div className={styles.hero}>
              <span className={styles.eyebrow}>About MacroSpark</span>
              <h1 className={styles.heading}>
                Independent research for<br />
                <span className={styles.accent}>serious thinkers.</span>
              </h1>
              <p className={styles.sub}>
                MacroSpark is an independent finance and economics intelligence platform.
                We publish original research, long-form analysis, and quantitative projects
                — written for professionals, economists, and anyone who takes markets seriously.
              </p>
            </div>
          </FadeIn>

          {/* Mission */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.missionBlock}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                To publish rigorous, original finance and economics research in a format
                that commands the respect of institutional readers — and to make that work
                permanently discoverable, readable, and citable.
              </p>
              <p className={styles.missionText}>
                We believe that the highest-quality macro thinking should not be locked inside
                investment banks, hedge funds, or academic journals. MacroSpark is our attempt
                to change that.
              </p>
            </div>
          </FadeIn>

          {/* What we cover */}
          <FadeIn direction="up" delay={0.15}>
            <div className={styles.coversBlock}>
              <h2 className={styles.sectionTitle}>What We Cover</h2>
              <ul className={styles.coversList}>
                {WHAT_WE_COVER.map((item) => (
                  <li key={item} className={styles.coversItem}>
                    <span className={styles.bullet} aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.valuesGrid} stagger={0.07}>
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueBody}>{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          {/* Editorial standards */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.editorialBlock}>
              <h2 className={styles.sectionTitle}>Editorial Standards</h2>
              <p className={styles.editorialText}>
                All research published on MacroSpark is original work. Where external data is used,
                sources are cited inline. We distinguish clearly between fact, analysis, and opinion.
                We correct errors publicly and promptly.
              </p>
              <p className={styles.editorialText}>
                MacroSpark does not provide investment advice. Nothing published here constitutes
                a recommendation to buy or sell any financial instrument. All views are those of
                the author and are published for educational and research purposes only.
              </p>
            </div>
          </FadeIn>

        </Container>
      </div>
    </PageLayout>
  )
}
