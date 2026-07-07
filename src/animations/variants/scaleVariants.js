/**
 * Scale variants — for modals, popovers, and micro-interactions.
 * Origin is set by the consuming element's transform-origin CSS.
 *
 * @example
 * import { scaleIn } from '@/animations/variants/scaleVariants'
 * <m.div variants={scaleIn} initial="hidden" animate="visible" />
 */

const _ease = [0.16, 1, 0.3, 1]

/** @type {import('framer-motion').Variants} */
export const scaleIn = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: _ease } },
  exit: { scale: 0.96, opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

/** @type {import('framer-motion').Variants} */
export const scaleInCenter = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: _ease } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Micro: button press feedback
/** @type {import('framer-motion').Variants} */
export const pressScale = {
  rest: { scale: 1 },
  hover: { scale: 1.01, transition: { duration: 0.15, ease: _ease } },
  pressed: { scale: 0.97, transition: { duration: 0.08, ease: 'easeIn' } },
}

// Card hover lift
/** @type {import('framer-motion').Variants} */
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.25, ease: _ease } },
  hover: { y: -3, transition: { duration: 0.25, ease: _ease } },
}
