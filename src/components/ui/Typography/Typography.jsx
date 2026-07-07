import clsx from 'clsx'
import styles from './Typography.module.scss'

const scaleMap = {
  'display-2xl': styles.display2xl,
  'display-xl': styles.displayXl,
  'display-lg': styles.displayLg,
  'display-md': styles.displayMd,
  'display-sm': styles.displaySm,
  'heading-xl': styles.headingXl,
  'heading-lg': styles.headingLg,
  'heading-md': styles.headingMd,
  'heading-sm': styles.headingSm,
  'body-xl': styles.bodyXl,
  'body-lg': styles.bodyLg,
  'body-md': styles.bodyMd,
  'body-sm': styles.bodySm,
  'label-lg': styles.labelLg,
  'label-md': styles.labelMd,
  'label-sm': styles.labelSm,
  eyebrow: styles.eyebrow,
  caption: styles.caption,
}

const colorMap = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary: styles.colorTertiary,
  accent: styles.colorAccent,
  positive: styles.colorPositive,
  negative: styles.colorNegative,
}

const alignMap = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
}

/**
 * Polymorphic typography primitive.
 *
 * @param {{
 *   as?: keyof JSX.IntrinsicElements,
 *   scale: keyof scaleMap,
 *   color?: 'primary'|'secondary'|'tertiary'|'accent'|'positive'|'negative',
 *   align?: 'left'|'center'|'right',
 *   balance?: boolean,
 *   className?: string,
 *   children: React.ReactNode,
 * }} props
 *
 * @example
 * <Typography as="h1" scale="display-lg" balance>MacroSpark</Typography>
 * <Typography as="p" scale="body-lg" color="secondary">Supporting text</Typography>
 */
export default function Typography({
  as: Tag = 'p',
  scale,
  color,
  align,
  balance = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={clsx(
        scaleMap[scale],
        color && colorMap[color],
        align && alignMap[align],
        balance && styles.balance,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

// ── Typed convenience components ──────────────────────────────────────────────

export function Heading({ level = 2, scale = 'heading-lg', ...props }) {
  const tag = `h${Math.min(Math.max(level, 1), 6)}`
  return <Typography as={tag} scale={scale} balance {...props} />
}

export function Body({ scale = 'body-md', ...props }) {
  return <Typography as="p" scale={scale} {...props} />
}

export function Label({ scale = 'label-md', ...props }) {
  return <Typography as="span" scale={scale} color="secondary" {...props} />
}

export function Eyebrow(props) {
  return <Typography as="span" scale="eyebrow" {...props} />
}

export function Caption(props) {
  return <Typography as="span" scale="caption" {...props} />
}
