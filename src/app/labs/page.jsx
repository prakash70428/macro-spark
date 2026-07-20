import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import { LABS_TOOLS } from './data'
import { LAB_ICONS } from './icons'
import styles from './page.module.scss'

export const metadata = {
  title: 'MacroSpark Labs',
  description:
    'Building AI-powered and quantitative finance tools to improve financial decision-making.',
}

export default function LabsPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Labs</span>
              <h1 className={styles.heading}>MacroSpark Labs</h1>
              <p className={styles.sub}>
                Building AI-powered and quantitative finance tools to improve financial
                decision-making.
              </p>
            </div>
          </FadeIn>

          <div className={styles.grid}>
            {LABS_TOOLS.map((tool, i) => {
              const isAvailable = tool.status === 'available'
              const cardContent = (
                <>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap}>{LAB_ICONS[tool.icon]}</div>
                    <span
                      className={
                        isAvailable
                          ? styles.statusBadge
                          : `${styles.statusBadge} ${styles.statusBadgeSoon}`
                      }
                    >
                      {isAvailable ? 'Available' : 'Coming soon'}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{tool.title}</h2>
                    <p className={styles.desc}>{tool.description}</p>
                  </div>

                  {isAvailable && (
                    <div className={styles.cardFooter}>
                      <span className={styles.cta}>
                        Open tool
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  )}
                </>
              )

              return (
                <FadeIn direction="up" delay={0.05 * i} key={tool.id}>
                  {isAvailable ? (
                    <Link href={tool.href} className={styles.card}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={`${styles.card} ${styles.cardDisabled}`} aria-disabled="true">
                      {cardContent}
                    </div>
                  )}
                </FadeIn>
              )
            })}
          </div>
        </Container>
      </div>
    </PageLayout>
  )
}
