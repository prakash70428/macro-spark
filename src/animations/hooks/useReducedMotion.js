'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Returns true if the user has requested reduced motion via OS settings.
 * Wraps Framer Motion's useReducedMotion to provide a single import point.
 * Use this to gate JS-driven animations (not CSS — CSS is handled in _reset.scss).
 *
 * @returns {boolean}
 *
 * @example
 * const prefersReducedMotion = useReducedMotion()
 * const variants = prefersReducedMotion ? {} : fadeInUp
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false
}
