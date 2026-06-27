import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Hero from '@/components/sections/Hero/Hero'
import MarketTicker from '@/components/sections/MarketTicker/MarketTicker'
import DashboardPreview from '@/components/sections/DashboardPreview/DashboardPreview'
import MetricsSection from '@/components/sections/MetricsSection/MetricsSection'
import NewsletterCTA from '@/components/sections/CTASection/NewsletterCTA'
import TrialCTA from '@/components/sections/CTASection/TrialCTA'

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <MarketTicker />
      <DashboardPreview />
      <MetricsSection />
      <NewsletterCTA />
      <TrialCTA />
    </PageLayout>
  )
}
