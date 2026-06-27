import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './page.module.scss'

export const metadata = {
  title: 'Podcasts',
  description: 'Expert conversations on macro, markets, and global economics — weekly episodes from MacroSpark.',
}

const PLATFORMS = ['Spotify', 'Apple Podcasts', 'Google Podcasts', 'Amazon Music', 'RSS']

const FEATURED = {
  emoji: '🎙️',
  eyebrow: 'Latest Episode · Ep. 214',
  title: 'The Dollar Dilemma: Reserve Currency Status in a Multipolar World',
  desc: 'We sit down with Dr. Carmen Reinhart to explore whether the dollar\'s dominance is structurally threatened, what history tells us about reserve currency transitions, and how investors should position for a world of slower dollar recycling.',
  meta: 'Jun 23, 2026 · 54 min · Dr. Carmen Reinhart, Harvard',
  href: '#',
}

const EPISODES = [
  { num: '213', title: 'Inside the ECB — The Impossible Triangle',         guest: 'Isabel Schnabel',       duration: '48 min', date: 'Jun 16' },
  { num: '212', title: 'China\'s Property Market: Contagion or Contained?', guest: 'Michael Pettis',        duration: '61 min', date: 'Jun 9'  },
  { num: '211', title: 'The Carry Trade Unwind — Lessons from 2024',        guest: 'Brent Donnelly',        duration: '43 min', date: 'Jun 2'  },
  { num: '210', title: 'EM Debt Restructuring: A Framework',                guest: 'Mitu Gulati',           duration: '52 min', date: 'May 26' },
  { num: '209', title: 'AI and the Labour Market: A Macro View',            guest: 'Daron Acemoglu',        duration: '67 min', date: 'May 19' },
  { num: '208', title: 'Commodity Supercycles — Fact or Fiction?',          guest: 'Jeff Currie',           duration: '55 min', date: 'May 12' },
  { num: '207', title: 'Credit Markets Through the Hiking Cycle',           guest: 'Marty Fridson',         duration: '41 min', date: 'May 5'  },
  { num: '206', title: 'The Case for Active FX Management',                 guest: 'Alessio de Longis',     duration: '49 min', date: 'Apr 28' },
]

export default function PodcastsPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Podcast</span>
              <h1 className={styles.heading}>Signal in the Noise</h1>
              <p className={styles.sub}>
                Weekly conversations with the world's top economists, fund managers,
                and market strategists. No filler — just insight.
              </p>
            </div>
          </FadeIn>

          {/* Platform links */}
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.platforms}>
              <span className={styles.platformLabel}>Listen on:</span>
              {PLATFORMS.map((p) => (
                <Link key={p} href="#" className={styles.platformBadge}>{p}</Link>
              ))}
            </div>
          </FadeIn>

          {/* Featured */}
          <FadeIn direction="up" delay={0.15}>
            <h2 className={styles.sectionTitle}>Latest Episode</h2>
            <div className={styles.featured}>
              <div className={styles.featuredArt} aria-hidden="true">
                {FEATURED.emoji}
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.featuredEyebrow}>{FEATURED.eyebrow}</span>
                <h3 className={styles.featuredTitle}>{FEATURED.title}</h3>
                <p className={styles.featuredDesc}>{FEATURED.desc}</p>
                <span className={styles.featuredMeta}>{FEATURED.meta}</span>
                <Link href={FEATURED.href} className={styles.playBtn}>
                  ▶ Play episode
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Episode list */}
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.sectionTitle}>All Episodes</h2>
          </FadeIn>
          <StaggerList as="div" className={styles.episodes} stagger={0.05}>
            {EPISODES.map((ep) => (
              <StaggerItem key={ep.num}>
                <Link href="#" className={styles.episode}>
                  <span className={styles.epNum}>{ep.num}</span>
                  <div className={styles.epInfo}>
                    <span className={styles.epTitle}>{ep.title}</span>
                    <span className={styles.epMeta}>{ep.guest} · {ep.date}</span>
                  </div>
                  <span className={styles.epDuration}>{ep.duration}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </div>
    </PageLayout>
  )
}
