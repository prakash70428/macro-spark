import Link from 'next/link'
import Container from '../Container/Container'
import NewsletterForm from './NewsletterForm'
import { FOOTER_NAV_COMPANY, FOOTER_NAV_PRODUCT } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import styles from './Footer.module.scss'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.top}>
          {/* Brand + newsletter */}
          <div className={styles.brand}>
            <Link href={ROUTES.HOME} className={styles.logo} aria-label="MacroSpark — home">
              Macro<span>Spark</span>
            </Link>
            <p className={styles.tagline}>
              Professional intelligence for finance, economics, and global markets.
            </p>

            <div className={styles.newsletter}>
              <span className={styles.newsletterLabel}>Weekly briefing — free</span>
              <NewsletterForm />
            </div>
          </div>

          {/* Product links */}
          <nav aria-label="Product navigation" className={styles.column}>
            <span className={styles.columnTitle}>Product</span>
            <ul className={styles.columnLinks} role="list">
              {FOOTER_NAV_PRODUCT.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company links */}
          <nav aria-label="Company navigation" className={styles.column}>
            <span className={styles.columnTitle}>Company</span>
            <ul className={styles.columnLinks} role="list">
              {FOOTER_NAV_COMPANY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.REGISTER} className={styles.columnLink}>
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {YEAR} MacroSpark. All rights reserved.</p>
          <ul className={styles.legalLinks} role="list">
            <li>
              <Link href={ROUTES.PRIVACY} className={styles.legalLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={ROUTES.TERMS} className={styles.legalLink}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href={ROUTES.COOKIES} className={styles.legalLink}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
