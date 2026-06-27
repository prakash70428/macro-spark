/**
 * Slide variants — directional motion for drawers, panels, toasts.
 * All use the editorial ease [0.16, 1, 0.3, 1] for a confident, premium feel.
 *
 * @example
 * import { slideInRight } from '@/animations/variants/slideVariants'
 * <m.aside variants={slideInRight} initial="hidden" animate="visible" />
 */

const _ease = [0.16, 1, 0.3, 1]
const _duration = 0.35

/** @type {import('framer-motion').Variants} */
export const slideInRight = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: _duration, ease: _ease } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

/** @type {import('framer-motion').Variants} */
export const slideInLeft = {
  hidden:  { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: _duration, ease: _ease } },
  exit:    { x: '-100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

/** @type {import('framer-motion').Variants} */
export const slideInUp = {
  hidden:  { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: _duration, ease: _ease } },
  exit:    { y: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

/** @type {import('framer-motion').Variants} */
export const slideInDown = {
  hidden:  { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: _duration, ease: _ease } },
  exit:    { y: '-100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

// Partial slide — for dropdowns and tooltips (not full-screen panels)
/** @type {import('framer-motion').Variants} */
export const dropdownSlide = {
  hidden:  { y: -8, opacity: 0, scaleY: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.2, ease: _ease },
  },
  exit: {
    y: -4,
    opacity: 0,
    scaleY: 0.97,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
}
