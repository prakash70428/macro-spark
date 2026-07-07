import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import ContactForm from './ContactForm'
import styles from './page.module.scss'

export const metadata = {
  title: 'Contact MacroSpark',
  description:
    'Get in touch with the MacroSpark team for press enquiries, research questions, or partnership opportunities.',
}

const CONTACTS = [
  {
    title: 'Editorial',
    desc: 'Research questions, corrections, or pitching a story',
    email: 'editorial@macrospark.com',
  },
  {
    title: 'Press & Media',
    desc: 'Interviews, quotes, and media kit requests',
    email: 'press@macrospark.com',
  },
  {
    title: 'Partnerships',
    desc: 'Data licensing, API access, and institutional enquiries',
    email: 'partners@macrospark.com',
  },
  {
    title: 'General',
    desc: 'Feedback, subscriptions, and account support',
    email: 'hello@macrospark.com',
  },
]

export default function ContactPage() {
  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <div className={styles.layout}>
            {/* Form column */}
            <div>
              <FadeIn direction="up">
                <div className={styles.pageHeader}>
                  <span className={styles.eyebrow}>Get in Touch</span>
                  <h1 className={styles.heading}>Contact Us</h1>
                  <p className={styles.sub}>
                    We respond to every message. Typical response time is 1–2 business days.
                  </p>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Sidebar */}
            <FadeIn direction="left" delay={0.2}>
              <div className={styles.sidebar}>
                <div className={styles.sideWidget}>
                  <span className={styles.widgetTitle}>Direct Contacts</span>
                  {CONTACTS.map((c) => (
                    <div key={c.title} className={styles.widgetItem}>
                      <span className={styles.widgetItemTitle}>{c.title}</span>
                      <span className={styles.widgetItemDesc}>{c.desc}</span>
                      <a href={`mailto:${c.email}`} className={styles.widgetLink}>
                        {c.email}
                      </a>
                    </div>
                  ))}
                </div>

                <div className={styles.sideWidget}>
                  <span className={styles.widgetTitle}>Response Time</span>
                  <div className={styles.widgetItem}>
                    <span className={styles.widgetItemTitle}>Editorial enquiries</span>
                    <span className={styles.widgetItemDesc}>1–2 business days</span>
                  </div>
                  <div className={styles.widgetItem}>
                    <span className={styles.widgetItemTitle}>Press & media</span>
                    <span className={styles.widgetItemDesc}>Same day when possible</span>
                  </div>
                  <div className={styles.widgetItem}>
                    <span className={styles.widgetItemTitle}>Partnership enquiries</span>
                    <span className={styles.widgetItemDesc}>3–5 business days</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </PageLayout>
  )
}
