'use client'

import { m } from 'framer-motion'
import { useAnimationConfig } from '@/animations/hooks/useAnimationConfig'

/**
 * Slides children in from a specified edge.
 * Used for drawers, toasts, sidebars, and notification banners.
 *
 * @param {{
 *   from?: 'left' | 'right' | 'top' | 'bottom',
 *   className?: string,
 *   children: React.ReactNode,
 * }} props
 */
export default function SlideIn({ from = 'right', className, children }) {
  const { shouldAnimate, transition } = useAnimationConfig()

  const initial = {
    left:   { x: '-100%', opacity: 0 },
    right:  { x: '100%',  opacity: 0 },
    top:    { y: '-100%', opacity: 0 },
    bottom: { y: '100%',  opacity: 0 },
  }[from]

  return (
    <m.div
      className={className}
      initial={shouldAnimate ? initial : false}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={shouldAnimate ? initial : undefined}
      transition={transition.normal}
    >
      {children}
    </m.div>
  )
}
