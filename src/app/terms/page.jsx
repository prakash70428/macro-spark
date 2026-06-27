import Container from '@/components/layout/Container/Container'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import styles from '@/app/(legal)/legal.module.scss'

export const metadata = {
  title: 'Terms of Service',
  description: 'MacroSpark Terms of Service — governing your use of the platform.',
}

export default function TermsPage() {
  return (
    <PageLayout>
      <Container>
        <div className={styles.page}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.heading}>Terms of Service</h1>
          <span className={styles.updated}>Last updated: 1 June 2026</span>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>1. Acceptance</h2>
            <div className={styles.body}>
              <p>By accessing MacroSpark you agree to be bound by these Terms. If you do not agree, do not use the platform. These Terms apply to all visitors, subscribers, and users.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>2. Content & Intellectual Property</h2>
            <div className={styles.body}>
              <p>All content on MacroSpark — including articles, data, charts, and commentary — is the intellectual property of MacroSpark Ltd or its contributors. You may not reproduce, distribute, or commercially exploit any content without express written permission.</p>
              <p>Personal, non-commercial use (reading, sharing links) is permitted. Reproduction in whole or in part for commercial purposes requires a licensing agreement.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>3. Not Financial Advice</h2>
            <div className={styles.body}>
              <p>MacroSpark content is for informational and educational purposes only. Nothing on this platform constitutes financial advice, investment advice, or a recommendation to buy or sell any security. Always consult a qualified financial adviser before making investment decisions.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>4. Subscriptions & Billing</h2>
            <ul className={styles.list}>
              <li>Free tier: newsletter and limited articles</li>
              <li>Subscriber: full article access, datasets, podcast archive</li>
              <li>Premium: all subscriber benefits + reports, PDF downloads, API access</li>
              <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
              <li>Refunds available within 14 days of purchase</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>5. Limitation of Liability</h2>
            <div className={styles.body}>
              <p>MacroSpark Ltd is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform or reliance on any content published on it. The platform is provided &ldquo;as is&rdquo; without warranties of any kind.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>6. Governing Law</h2>
            <div className={styles.body}>
              <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
