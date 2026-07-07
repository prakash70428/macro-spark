'use client'

import { m } from 'framer-motion'
import { useAnimationConfig } from '@/animations/hooks/useAnimationConfig'

const containerVariants = {
  hidden: {},
  visible: (stagger = 0.07) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}

const childVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

// Pre-built motion tags — avoids dynamic m[as] lookup
const MotionDiv = m.div
const MotionUl = m.ul
const MotionOl = m.ol

const TAG_MAP = { div: MotionDiv, ul: MotionUl, ol: MotionOl }

/**
 * Wraps a list and staggers each child's fade-in.
 * `as` prop controls the rendered list element (ul, ol, div).
 *
 * @param {{
 *   as?: 'ul' | 'ol' | 'div',
 *   stagger?: number,
 *   once?: boolean,
 *   className?: string,
 *   children: React.ReactNode,
 * }} props
 *
 * @example
 * <StaggerList as="ul" stagger={0.06}>
 *   {articles.map(a => (
 *     <StaggerList.Item key={a.id}>
 *       <ArticleCard {...a} />
 *     </StaggerList.Item>
 *   ))}
 * </StaggerList>
 */
export default function StaggerList({
  as = 'div',
  stagger = 0.07,
  once = true,
  className,
  children,
}) {
  const { shouldAnimate } = useAnimationConfig()
  const Tag = TAG_MAP[as] ?? MotionDiv

  return (
    <Tag
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial={shouldAnimate ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </Tag>
  )
}

/**
 * Individual stagger item — must be a direct child of StaggerList.
 */
export function StaggerItem({ className, children }) {
  const { transition } = useAnimationConfig()
  return (
    <m.div className={className} variants={childVariants} transition={transition.normal}>
      {children}
    </m.div>
  )
}
