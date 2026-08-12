import styles from './LineChart.module.scss'

/**
 * Multi-series inline SVG line chart. No chart library — matches the
 * "UI/UX only, no new dependency" scope used by Sparkline elsewhere in Labs.
 * Used for portfolio equity curves and IPO price trajectories.
 *
 * @param {Object} props
 * @param {{ id: string, label: string, color: string, values: number[] }[]} props.series
 * @param {string[]} props.xLabels same length as each series' values
 * @param {number} [props.height=260]
 * @param {(value: number) => string} [props.yFormat]
 * @param {string} [props.ariaLabel]
 */
export default function LineChart({
  series,
  xLabels,
  height = 260,
  yFormat = (v) => v.toFixed(0),
  ariaLabel = 'Line chart',
}) {
  if (!series || series.length === 0 || !series[0].values || series[0].values.length < 2) {
    return null
  }

  const width = 640
  const padLeft = 56
  const padRight = 16
  const padTop = 16
  const padBottom = 28

  const innerWidth = width - padLeft - padRight
  const innerHeight = height - padTop - padBottom
  const pointCount = series[0].values.length

  const allValues = series.flatMap((s) => s.values)
  const rawMin = Math.min(...allValues)
  const rawMax = Math.max(...allValues)
  const pad = (rawMax - rawMin) * 0.08 || Math.abs(rawMax) * 0.08 || 1
  const min = rawMin - pad
  const max = rawMax + pad
  const range = max - min || 1

  const stepX = innerWidth / (pointCount - 1)

  const toX = (i) => padLeft + i * stepX
  const toY = (v) => padTop + innerHeight - ((v - min) / range) * innerHeight

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => min + t * range)

  const labelIndices = (() => {
    const maxLabels = 6
    if (pointCount <= maxLabels) return xLabels.map((_, i) => i)
    const step = Math.ceil((pointCount - 1) / (maxLabels - 1))
    const idx = []
    for (let i = 0; i < pointCount; i += step) idx.push(i)
    if (idx[idx.length - 1] !== pointCount - 1) idx.push(pointCount - 1)
    return idx
  })()

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label={ariaLabel}
      >
        {gridLines.map((v, i) => (
          <g key={i}>
            <line
              x1={padLeft}
              x2={width - padRight}
              y1={toY(v)}
              y2={toY(v)}
              stroke="var(--color-border-subtle)"
              strokeWidth="1"
            />
            <text
              x={padLeft - 8}
              y={toY(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fill="var(--color-text-tertiary)"
            >
              {yFormat(v)}
            </text>
          </g>
        ))}

        {labelIndices.map((i) => (
          <text
            key={i}
            x={toX(i)}
            y={height - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--color-text-tertiary)"
          >
            {xLabels[i]}
          </text>
        ))}

        {series.map((s) => {
          const points = s.values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
          const lastX = toX(s.values.length - 1)
          const lastY = toY(s.values[s.values.length - 1])
          return (
            <g key={s.id}>
              <polyline
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={lastX} cy={lastY} r="3" fill={s.color} />
            </g>
          )
        })}
      </svg>

      <div className={styles.legend}>
        {series.map((s) => (
          <span key={s.id} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
