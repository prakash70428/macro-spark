import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Card.module.scss'

/**
 * Base card — a surface container with optional interactivity.
 *
 * @param {{ variant?: 'default'|'flat'|'elevated', interactive?: boolean }} props
 */
const Card = forwardRef(function Card(
  { variant = 'default', interactive = false, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        styles.card,
        variant !== 'default' && styles[variant],
        interactive && styles.interactive,
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'article' : undefined}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card
