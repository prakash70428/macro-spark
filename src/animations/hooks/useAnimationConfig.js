'use client'

import { useReducedMotion } from './useReducedMotion'

/**
 * Returns animation config objects conditioned on user's motion preference.
 * When reduced motion is preferred, all transitions are instant (0 duration).
 *
 * @returns {{
 *   shouldAnimate: boolean,
 *   transition: {
 *     fast: import('framer-motion').Transition,
 *     normal: import('framer-motion').Transition,
 *     slow: import('framer-motion').Transition,
 *     spring: import('framer-motion').Transition,
 *   },
 *   getVariants: (variants: import('framer-motion').Variants) => import('framer-motion').Variants,
 * }}
 *
 * @example
 * const { shouldAnimate, transition, getVariants } = useAnimationConfig()
 * const safeVariants = getVariants(fadeInUp)
 *
 * <m.div variants={safeVariants} transition={transition.normal} />
 */
export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion()

  const instant = { duration: 0 }

  const transition = prefersReducedMotion
    ? { fast: instant, normal: instant, slow: instant, spring: instant }
    : {
        fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
        normal: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        slow: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        spring: { type: 'spring', stiffness: 400, damping: 30 },
      }

  // Strips motion from variants for users who prefer reduced motion
  function getVariants(variants) {
    if (!prefersReducedMotion) return variants

    const stripped = {}
    for (const [key, value] of Object.entries(variants)) {
      stripped[key] = {
        ...value,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: instant,
      }
    }
    return stripped
  }

  return {
    shouldAnimate: !prefersReducedMotion,
    transition,
    getVariants,
  }
}
