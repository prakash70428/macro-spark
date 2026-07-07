import { Suspense } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/animation/FadeIn'
import ResetPasswordForm from './ResetPasswordForm'
import { ROUTES } from '@/constants/routes'
import styles from '../login/page.module.scss'

export const metadata = {
  title: 'Set New Password',
  description: 'Set a new password for your MacroSpark account.',
}

export default function ResetPasswordPage() {
  return (
    <div className={styles.page}>
      <FadeIn direction="up">
        <div className={styles.card}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            Macro<span>Spark</span>
          </Link>

          <h1 className={styles.heading}>Set a new password</h1>
          <p className={styles.sub}>Choose a strong password for your account.</p>

          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </FadeIn>
    </div>
  )
}
