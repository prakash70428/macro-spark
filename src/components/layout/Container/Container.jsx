import clsx from 'clsx'
import styles from './Container.module.scss'

/**
 * Page-width constraint wrapper.
 *
 * @param {{
 *   size?: 'default' | 'article' | 'wide' | 'narrow' | 'fluid',
 *   as?: keyof JSX.IntrinsicElements,
 *   className?: string,
 *   children: React.ReactNode,
 * }} props
 */
export default function Container({
  size = 'default',
  as: Tag = 'div',
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={clsx(
        styles.container,
        size !== 'default' && styles[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
