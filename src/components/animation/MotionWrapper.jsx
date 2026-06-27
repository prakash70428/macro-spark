'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useAnimationConfig } from '@/animations/hooks/useAnimationConfig'
import { pageTransition, pageTransitionConfig } from '@/animations/variants/pageVariants'

/**
 * Page-level transition wrapper.
 * Place inside a route's layout.jsx, keyed by pathname.
 *
 * @param {{ routeKey: string, children: React.ReactNode }} props
 *
 * @example
 * // In a segment layout:
 * 'use client'
 * import { usePathname } from 'next/navigation'
 * import MotionWrapper from '@/components/animation/MotionWrapper'
 *
 * export default function Layout({ children }) {
 *   const pathname = usePathname()
 *   return <MotionWrapper routeKey={pathname}>{children}</MotionWrapper>
 * }
 */
export default function MotionWrapper({ routeKey, children }) {
  const { shouldAnimate } = useAnimationConfig()

  if (!shouldAnimate) return children

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={routeKey}
        variants={pageTransition}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={pageTransitionConfig}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
