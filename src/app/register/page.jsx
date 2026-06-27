import Link from 'next/link'
import FadeIn from '@/components/animation/FadeIn'
import RegisterForm from './RegisterForm'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'Create Account',
  description: 'Start your free MacroSpark account — professional markets intelligence.',
}

const PERKS = [
  'Weekly briefing — free, every Sunday',
  'Access to 200+ research articles',
  'Real-time market data overview',
  'Cancel or upgrade any time',
]

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <FadeIn direction="up">
        <div className={styles.card}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            Macro<span>Spark</span>
          </Link>

          <h1 className={styles.heading}>Start for free</h1>
          <p className={styles.sub}>Join 40,000+ finance professionals</p>

          <ul className={styles.perks} role="list">
            {PERKS.map((p) => (
              <li key={p} className={styles.perk}>{p}</li>
            ))}
          </ul>

          <RegisterForm />

          <p className={styles.footer}>
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className={styles.footerLink}>Sign in</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
