import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import Button from '@/components/ui/Button/Button'
import FadeIn from '@/components/animation/FadeIn'
import { ROUTES } from '@/constants/routes'
import styles from './not-found.module.scss'

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return (
    <PageLayout>
      <Container>
        <FadeIn direction="up">
          <div className={styles.page}>
            <span className={styles.code}>404</span>
            <h1 className={styles.heading}>Page not found</h1>
            <p className={styles.sub}>
              The page you were looking for doesn&apos;t exist or has been moved.
            </p>
            <div className={styles.actions}>
              <Button as={Link} href={ROUTES.HOME} variant="primary" size="md">
                Go to homepage
              </Button>
              <Button as={Link} href={ROUTES.ARTICLES} variant="secondary" size="md">
                Browse research
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </PageLayout>
  )
}
