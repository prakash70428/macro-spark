import Sparkline from '../Sparkline'
import styles from './StatTile.module.scss'

/**
 * Dashboard stat tile — label, value, trend badge, optional sparkline.
 * Data-agnostic: caller supplies formatted value/trend strings and a raw
 * numeric array for the sparkline (static sample data for now).
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {'up' | 'down' | 'flat'} [props.trendDirection='flat']
 * @param {string} [props.trendLabel]
 * @param {number[]} [props.sparklineData]
 */
export default function StatTile({
  label,
  value,
  trendDirection = 'flat',
  trendLabel,
  sparklineData,
}) {
  const trendColor =
    trendDirection === 'up'
      ? 'var(--color-success, #10b981)'
      : trendDirection === 'down'
        ? 'var(--color-danger, #ef4444)'
        : 'var(--color-text-tertiary)'

  return (
    <div className={styles.tile}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {trendLabel && (
          <span className={styles.trend} style={{ color: trendColor }}>
            {trendDirection === 'up' && '▲'}
            {trendDirection === 'down' && '▼'}
            {trendDirection === 'flat' && '—'}
            {trendLabel}
          </span>
        )}
      </div>
      <span className={styles.value}>{value}</span>
      {sparklineData && (
        <div className={styles.sparklineWrap}>
          <Sparkline data={sparklineData} color={trendColor} />
        </div>
      )}
    </div>
  )
}
