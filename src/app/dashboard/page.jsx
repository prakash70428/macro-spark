import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'

export const metadata = {
  title: 'Dashboard',
  description: 'Your MacroSpark personalised dashboard.',
}

export default function DashboardPage() {
  return (
    <PageLayout>
      <Container>
        <FadeIn direction="up">
          <div style={{ paddingBlock: 'var(--space-12) var(--space-20)', textAlign: 'center' }}>
            <h1
              style={{ fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}
            >
              Dashboard
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Personalised dashboard — coming in Sprint 6.
            </p>
          </div>
        </FadeIn>
      </Container>
    </PageLayout>
  )
}
