'use client'

// LazyMotion loads only the animation features we need (domAnimation ~18KB vs 95KB full bundle).
// Components MUST use `m.div`, `m.ul` etc. — NOT `motion.div` — inside this LazyMotion context.
import { LazyMotion, domAnimation } from 'framer-motion'
import AuthInitializer from '@/components/auth/AuthInitializer'

/**
 * Client boundary wrapper.
 * - Provides LazyMotion with the domAnimation feature set
 * - Mounts AuthInitializer which silently refreshes the session on boot
 */
export default function Providers({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AuthInitializer />
      {children}
    </LazyMotion>
  )
}
