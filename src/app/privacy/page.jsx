import Container from '@/components/layout/Container/Container'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import styles from '@/app/(legal)/legal.module.scss'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How MacroSpark collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <PageLayout>
      <Container>
        <div className={styles.page}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.heading}>Privacy Policy</h1>
          <span className={styles.updated}>Last updated: 1 June 2026</span>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
            <div className={styles.body}>
              <p>
                We collect information you provide directly to us, including your name, email
                address, and password when you create an account. We also collect usage data — the
                pages you visit, articles you read, and features you use — to improve the platform.
              </p>
              <p>
                We do not sell your personal data to third parties. We do not show advertising. Our
                business model is subscriptions.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>2. How We Use Your Information</h2>
            <ul className={styles.list}>
              <li>To provide, maintain, and improve MacroSpark</li>
              <li>To send the weekly newsletter and transactional emails</li>
              <li>To personalise your content experience</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>3. Data Retention</h2>
            <div className={styles.body}>
              <p>
                We retain your account data for as long as your account is active. You may delete
                your account at any time from Settings — this will permanently remove your personal
                data within 30 days, except where retention is required by law.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>4. Cookies</h2>
            <div className={styles.body}>
              <p>
                We use strictly necessary cookies for authentication (session tokens) and functional
                cookies to remember your preferences such as dark/light mode. We do not use
                third-party tracking cookies or advertising cookies. See our{' '}
                <a href="/cookies">Cookies Policy</a> for full details.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>5. Your Rights</h2>
            <ul className={styles.list}>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Port your data to another service</li>
              <li>Object to processing for marketing purposes</li>
            </ul>
            <div className={styles.body} style={{ marginTop: '1rem' }}>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@macrospark.com">privacy@macrospark.com</a>.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>6. Contact</h2>
            <div className={styles.body}>
              <p>
                MacroSpark Ltd, Data Controller. For privacy enquiries:{' '}
                <a href="mailto:privacy@macrospark.com">privacy@macrospark.com</a>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
