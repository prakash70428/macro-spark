import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'About MacroSpark',
  description: 'Our mission, team, and the values behind the MacroSpark intelligence platform.',
}

const STATS = [
  { value: '40,000+', label: 'Weekly readers'   },
  { value: '500+',    label: 'Research reports'  },
  { value: '214',     label: 'Podcast episodes'  },
  { value: '12',      label: 'Countries covered' },
]

const TEAM = [
  { name: 'Sarah Chen',    role: 'Senior Economist, Fed & Macro',   emoji: '👩‍💼' },
  { name: 'James Okafor',  role: 'Head of EM Research',              emoji: '👨‍💼' },
  { name: 'Priya Sharma',  role: 'Fixed Income Strategist',          emoji: '👩‍💻' },
  { name: 'Marco Rossi',   role: 'Commodities & FX Analyst',         emoji: '👨‍🔬' },
  { name: 'Aiko Tanaka',   role: 'Japan & Asia Pacific Macro',       emoji: '👩‍🏫' },
  { name: 'Reza Ahmadi',   role: 'Energy & ESG Research',            emoji: '👨‍🏭' },
]

const VALUES = [
  { title: 'Depth over volume',    desc: 'We publish less and research more. Quality is non-negotiable.' },
  { title: 'No conflicts of interest', desc: 'MacroSpark takes no advertising from financial institutions. Our analysis is independent.' },
  { title: 'Accessible to all',   desc: 'Complex topics explained clearly — without sacrificing rigour.' },
  { title: 'Data-driven',         desc: 'Every claim is sourced. We show our work so you can verify it.' },
]

export default function AboutPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Mission */}
          <FadeIn direction="up">
            <div className={styles.mission}>
              <span className={styles.eyebrow}>Our Mission</span>
              <h1 className={styles.heading}>
                Professional Intelligence.<br />
                <em>Without the Noise.</em>
              </h1>
              <p className={styles.sub}>
                MacroSpark was built for the professional who doesn't have time to wade
                through noise. We provide rigorous, independent research on finance,
                economics, and global markets — the kind that was once locked behind
                six-figure Bloomberg terminals.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Our Principles</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.valuesGrid} stagger={0.08}>
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          {/* Team */}
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.sectionTitle}>The Team</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.team} stagger={0.07}>
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <div className={styles.member}>
                  <span className={styles.memberEmoji}>{member.emoji}</span>
                  <div>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          {/* CTA */}
          <FadeIn direction="up" delay={0.25}>
            <div className={styles.cta}>
              <h2 className={styles.ctaTitle}>Ready to get started?</h2>
              <p className={styles.ctaDesc}>Join 40,000+ professionals. Free newsletter every Sunday.</p>
              <div className={styles.ctaBtns}>
                <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="lg">Start for free</Button>
                <Button as={Link} href={ROUTES.CONTACT}  variant="secondary" size="lg">Get in touch</Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
