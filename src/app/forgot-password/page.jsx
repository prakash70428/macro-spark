import Link from 'next/link'
import FadeIn from '@/components/animation/FadeIn'
import ForgotPasswordForm from './ForgotPasswordForm'
import { ROUTES } from '@/constants/routes'
import styles from '../login/page.module.scss'

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your MacroSpark account password.',
}

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <FadeIn direction="up">
        <div className={styles.card}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            Macro<span>Spark</span>
          </Link>

          <h1 className={styles.heading}>Reset your password</h1>
          <p className={styles.sub}>Enter your email and we&apos;ll send a reset link.</p>

          <ForgotPasswordForm />
        </div>
      </FadeIn>
    </div>
  )
}
