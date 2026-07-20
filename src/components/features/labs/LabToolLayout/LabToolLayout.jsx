import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import { ROUTES } from '@/constants/routes'
import styles from './LabToolLayout.module.scss'

/**
 * Shared header shell for every MacroSpark Labs tool page — back link,
 * eyebrow, title, description — wrapping the tool's own body content.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} props.children
 */
export default function LabToolLayout({ title, description, children }) {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <Link href={ROUTES.LABS} className={styles.backLink}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Labs
            </Link>

            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Labs</span>
              <h1 className={styles.heading}>{title}</h1>
              <p className={styles.sub}>{description}</p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.08}>
            {children}
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
