import styles from './ScatterChart.module.scss'

/**
 * Inline SVG scatter plot with an optional overlaid regression line.
 * No chart library — matches the "UI/UX only, no new dependency" scope
 * used by Sparkline/LineChart elsewhere in Labs.
 * Used by the Interest Rate Impact Model to plot rate change vs. sector return.
 *
 * @param {Object} props
 * @param {{ x: number, y: number, label: string }[]} props.points
 * @param {{ slope: number, intercept: number }} [props.regression]
 * @param {string} [props.xLabel]
 * @param {string} [props.yLabel]
 * @param {(v: number) => string} [props.xFormat]
 * @param {(v: number) => string} [props.yFormat]
 * @param {string} [props.color='var(--color-interactive-primary)']
 * @param {number} [props.height=320]
 */
export default function ScatterChart({
  points,
  regression,
  xLabel = '',
  yLabel = '',
  xFormat = (v) => v.toFixed(2),
  yFormat = (v) => v.toFixed(1),
  color = 'var(--color-interactive-primary)',
  height = 320,
}) {
  if (!points || points.length < 2) return null

  const width = 640
  const padLeft = 60
  const padRight = 20
  const padTop = 16
  const padBottom = 44

  const innerWidth = width - padLeft - padRight
  const innerHeight = height - padTop - padBottom

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)

  const padX = (Math.max(...xs) - Math.min(...xs)) * 0.12 || 1
  const padY = (Math.max(...ys) - Math.min(...ys)) * 0.12 || 1
  const xMin = Math.min(...xs) - padX
  const xMax = Math.max(...xs) + padX
  const yMin = Math.min(...ys) - padY
  const yMax = Math.max(...ys) + padY
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1

  const toX = (x) => padLeft + ((x - xMin) / xRange) * innerWidth
  const toY = (y) => padTop + innerHeight - ((y - yMin) / yRange) * innerHeight

  const yGridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => yMin + t * yRange)
  const xGridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => xMin + t * xRange)

  const clipId = 'scatter-plot-area'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label={`Scatter plot of ${xLabel} vs ${yLabel}`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={padLeft} y={padTop} width={innerWidth} height={innerHeight} />
        </clipPath>
      </defs>

      {yGridLines.map((v, i) => (
        <g key={`y-${i}`}>
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
            className={styles.axisLabel}
          >
            {yFormat(v)}
          </text>
        </g>
      ))}

      {xGridLines.map((v, i) => (
        <text
          key={`x-${i}`}
          x={toX(v)}
          y={height - padBottom + 16}
          textAnchor="middle"
          fontSize="10"
          className={styles.axisLabel}
        >
          {xFormat(v)}
        </text>
      ))}

      {xMin < 0 && xMax > 0 && (
        <line
          x1={toX(0)}
          x2={toX(0)}
          y1={padTop}
          y2={padTop + innerHeight}
          stroke="var(--color-border-default)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      )}
      {yMin < 0 && yMax > 0 && (
        <line
          x1={padLeft}
          x2={padLeft + innerWidth}
          y1={toY(0)}
          y2={toY(0)}
          stroke="var(--color-border-default)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      )}

      {regression && (
        <line
          x1={toX(xMin)}
          y1={toY(regression.slope * xMin + regression.intercept)}
          x2={toX(xMax)}
          y2={toY(regression.slope * xMax + regression.intercept)}
          stroke={color}
          strokeWidth="2"
          clipPath={`url(#${clipId})`}
        />
      )}

      {points.map((p, i) => (
        <circle
          key={i}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r="4"
          fill="var(--color-bg-surface)"
          stroke={color}
          strokeWidth="2"
          aria-label={`${p.label}: ${xLabel} ${xFormat(p.x)}, ${yLabel} ${yFormat(p.y)}`}
        >
          {/* Note: an SVG <title> child would give a native hover tooltip, but Next.js's
              App Router head-streaming intercepts any <title> element in the tree — even
              nested inside SVG — causing a hydration mismatch. aria-label covers a11y instead. */}
        </circle>
      ))}

      <text
        x={padLeft + innerWidth / 2}
        y={height - 4}
        textAnchor="middle"
        fontSize="11"
        className={styles.axisLabel}
      >
        {xLabel}
      </text>
      <text
        x={-(padTop + innerHeight / 2)}
        y={14}
        textAnchor="middle"
        fontSize="11"
        transform="rotate(-90)"
        className={styles.axisLabel}
      >
        {yLabel}
      </text>
    </svg>
  )
}
