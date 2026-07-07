'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Container from '../Container/Container'
import Button from '../../ui/Button/Button'
import { PRIMARY_NAV } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import useAuthStore from '@/store/authStore'
import { logoutUser } from '@/lib/authService'
import styles from './Navbar.module.scss'

const menuVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const user = useAuthStore((s) => s.user)
  const authStatus = useAuthStore((s) => s.authStatus)
  const storeLogout = useAuthStore((s) => s.logout)

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  async function handleLogout() {
    try {
      await logoutUser()
    } catch {
      /* clear store regardless */
    }
    storeLogout()
    router.push(ROUTES.HOME)
  }

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Scroll glass effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll without losing scroll position
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const savedTop = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (savedTop) window.scrollTo(0, -parseInt(savedTop, 10))
    }
    return () => {
      const savedTop = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (savedTop) window.scrollTo(0, -parseInt(savedTop, 10))
    }
  }, [isOpen])

  const displayName = user ? (user.firstName ?? user.email?.split('@')[0]) : null

  return (
    <header className={clsx(styles.nav, isScrolled && styles.scrolled)} role="banner">
      <Container>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href={ROUTES.HOME} className={styles.logo} aria-label="MacroSpark — home">
            Macro<span>Spark</span>
          </Link>

          {/* Desktop nav links — hidden below lg */}
          <nav aria-label="Primary navigation">
            <ul className={styles.links} role="list">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      styles.link,
                      pathname.startsWith(item.href) && item.href !== '/' && styles.active
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions — hidden below lg */}
          <div className={styles.desktopActions}>
            {authStatus === 'authenticated' && user ? (
              <>
                <Button as={Link} href={ROUTES.DASHBOARD} variant="ghost" size="sm">
                  {displayName}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} href={ROUTES.LOGIN} variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="sm">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Tablet CTA — shows only md → lg (next to hamburger) */}
          <div className={styles.tabletCta}>
            {authStatus === 'authenticated' && user ? (
              <Button as={Link} href={ROUTES.DASHBOARD} variant="secondary" size="sm">
                Dashboard
              </Button>
            ) : (
              <Button as={Link} href={ROUTES.REGISTER} variant="primary" size="sm">
                Get Started
              </Button>
            )}
          </div>

          {/* Hamburger — hidden at lg+ */}
          <button
            className={styles.hamburger}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </Container>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-menu"
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.mobileNav}>
              <ul className={styles.mobileLinks} role="list">
                {PRIMARY_NAV.map((item) => (
                  <m.li key={item.href} variants={linkVariants}>
                    <Link
                      href={item.href}
                      className={styles.mobileLink}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>

              <div className={styles.mobileActions}>
                {authStatus === 'authenticated' && user ? (
                  <>
                    <Button as={Link} href={ROUTES.DASHBOARD} variant="secondary" fullWidth>
                      Dashboard
                    </Button>
                    <Button variant="primary" fullWidth onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button as={Link} href={ROUTES.LOGIN} variant="secondary" fullWidth>
                      Sign In
                    </Button>
                    <Button as={Link} href={ROUTES.REGISTER} variant="primary" fullWidth>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
