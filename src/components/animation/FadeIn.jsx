'use client'

import { m } from 'framer-motion'
import { useAnimationConfig } from '@/animations/hooks/useAnimationConfig'

/**
 * Fades in children when they enter the viewport (or on mount).
 * Respects prefers-reduced-motion.
 *
 * @param {{
 *   direction?: 'up' | 'down' | 'left' | 'right' | 'none',
 *   distance?: number,
 *   delay?: number,
 *   duration?: 'fast' | 'normal' | 'slow',
 *   once?: boolean,
 *   className?: string,
 *   children: React.ReactNode,
 * }} props
 *
 * @example
 * <FadeIn direction="up" delay={0.1}>
 *   <ArticleCard ... />
 * </FadeIn>
 */
export default function FadeIn({
  direction = 'up',
  distance = 16,
  delay = 0,
  duration = 'normal',
  once = true,
  className,
  children,
}) {
  const { shouldAnimate, transition } = useAnimationConfig()

  const offsetMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <m.div
      className={className}
      initial={shouldAnimate ? { opacity: 0, ...offsetMap[direction] } : false}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ ...transition[duration], delay }}
    >
      {children}
    </m.div>
  )
}
