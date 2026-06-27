import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

/**
 * @typedef {'primary' | 'secondary' | 'ghost' | 'danger'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 *
 * @typedef {Object} ButtonProps
 * @property {ButtonVariant}    [variant='primary']
 * @property {ButtonSize}       [size='md']
 * @property {boolean}          [loading=false]
 * @property {boolean}          [fullWidth=false]
 * @property {React.ReactNode}  [leftIcon]
 * @property {React.ReactNode}  [rightIcon]
 * @property {string}           [as='button']  - render as 'a' for link buttons
 * @property {React.ReactNode}  children
 */

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    as: Tag = 'button',
    className,
    children,
    disabled,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  const classes = clsx(
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  )

  return (
    <Tag
      ref={ref}
      className={classes}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && leftIcon}
      <span className={loading ? styles.loadingText : undefined}>
        {loading ? 'Loading…' : children}
      </span>
      {!loading && rightIcon}
    </Tag>
  )
})

export default Button
