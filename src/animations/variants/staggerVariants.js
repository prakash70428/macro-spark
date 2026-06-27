/**
 * Stagger container variants — orchestrate child animations in sequence.
 * The container controls timing; children use a plain fadeInUp variant.
 *
 * Pattern:
 *   <m.ul variants={staggerContainer} initial="hidden" animate="visible">
 *     {items.map(item => (
 *       <m.li key={item.id} variants={staggerChild}>...</m.li>
 *     ))}
 *   </m.ul>
 */

/** @type {import('framer-motion').Variants} */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

/** @type {import('framer-motion').Variants} */
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

/** @type {import('framer-motion').Variants} */
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

/** @type {import('framer-motion').Variants} */
export const staggerChild = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

/** @type {import('framer-motion').Variants} */
export const staggerChildFade = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
}
