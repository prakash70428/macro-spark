import Container from '@/components/layout/Container/Container'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import styles from '@/app/(legal)/legal.module.scss'

export const metadata = {
  title: 'Cookies Policy',
  description: 'How MacroSpark uses cookies and similar tracking technologies.',
}

const COOKIES = [
  { name: 'session_token',   type: 'Strictly necessary', purpose: 'Keeps you signed in between page loads',       duration: 'Session' },
  { name: 'refresh_token',   type: 'Strictly necessary', purpose: 'Securely renews your access without re-login',  duration: '7 days' },
  { name: 'theme_preference', type: 'Functional',        purpose: 'Remembers your dark/light mode preference',     duration: '1 year' },
  { name: 'consent_given',   type: 'Functional',         purpose: 'Records that you have accepted this policy',    duration: '1 year' },
]

export default function CookiesPage() {
  return (
    <PageLayout>
      <Container>
        <div className={styles.page}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.heading}>Cookies Policy</h1>
          <span className={styles.updated}>Last updated: 1 June 2026</span>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>What Are Cookies</h2>
            <div className={styles.body}>
              <p>Cookies are small text files stored on your device when you visit a website. They allow the site to remember your preferences and keep you signed in. MacroSpark uses only the cookies listed below — no advertising or third-party tracking cookies.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Cookies We Use</h2>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    {['Cookie', 'Type', 'Purpose', 'Duration'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--color-text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-interactive-primary)' }}>{c.name}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{c.type}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{c.purpose}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Managing Cookies</h2>
            <div className={styles.body}>
              <p>You can delete cookies at any time via your browser settings. Note that disabling strictly necessary cookies will prevent you from staying signed in. We do not use any opt-out mechanisms because we do not use advertising or tracking cookies.</p>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
