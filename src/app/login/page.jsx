import Link from 'next/link'
import FadeIn from '@/components/animation/FadeIn'
import LoginForm from './LoginForm'
import { ROUTES } from '@/constants/routes'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your MacroSpark account.',
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <FadeIn direction="up">
        <div className={styles.card}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            Macro<span>Spark</span>
          </Link>

          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your MacroSpark account</p>

          <LoginForm />

          <p className={styles.footer}>
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.REGISTER} className={styles.footerLink}>
              Get started free
            </Link>
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
