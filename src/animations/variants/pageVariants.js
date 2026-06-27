/**
 * Page-level transition variants.
 * Used in layout.jsx or route group layouts to animate between pages.
 *
 * @example
 * // In a layout that wraps page content:
 * import { pageTransition, pageTransitionConfig } from '@/animations/variants/pageVariants'
 *
 * <m.div
 *   key={pathname}
 *   variants={pageTransition}
 *   initial="initial"
 *   animate="enter"
 *   exit="exit"
 *   transition={pageTransitionConfig}
 * >
 *   {children}
 * </m.div>
 */

/** @type {import('framer-motion').Variants} */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -4 },
}

/** @type {import('framer-motion').Transition} */
export const pageTransitionConfig = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
}

// Heavier editorial page transition — for article → article navigation
/** @type {import('framer-motion').Variants} */
export const editorialTransition = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}
