/**
 * Fade variants for m.* elements (LazyMotion / domAnimation).
 * Use with `initial`, `animate`, `exit` props.
 *
 * @example
 * import { fadeIn } from '@/animations/variants/fadeVariants'
 * <m.div variants={fadeIn} initial="hidden" animate="visible" />
 */

/** @type {import('framer-motion').Variants} */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

/** @type {import('framer-motion').Variants} */
export const fadeInSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

/** @type {import('framer-motion').Variants} */
export const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

/** @type {import('framer-motion').Variants} */
export const fadeInDown = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
