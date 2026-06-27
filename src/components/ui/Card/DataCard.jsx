import clsx from 'clsx'
import styles from './Card.module.scss'

/**
 * Market data / metric card. Displays a single key number with change indicator.
 *
 * @param {{
 *   label: string,
 *   value: string,
 *   change?: string,
 *   changeDirection?: 'positive' | 'negative' | 'neutral',
 *   children?: React.ReactNode,   — optional sparkline or chart slot
 *   className?: string,
 * }} props
 */
export default function DataCard({
  label,
  value,
  change,
  changeDirection = 'neutral',
  children,
  className,
}) {
  const changeClass = {
    positive: styles.changePositive,
    negative: styles.changeNegative,
    neutral:  styles.changeNeutral,
  }[changeDirection]

  const arrow = changeDirection === 'positive' ? '▲' : changeDirection === 'negative' ? '▼' : '–'

  return (
    <div className={clsx(styles.card, styles.dataCard, className)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {change && (
        <span className={clsx(styles.change, changeClass)}>
          <span aria-hidden="true">{arrow}</span>
          {change}
        </span>
      )}
      {children && <div className={styles.sparkline}>{children}</div>}
    </div>
  )
}
