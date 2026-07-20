/**
 * Minimal inline SVG line chart driven by a static array of numbers.
 * No chart library — just a normalized polyline, matching the "UI/UX only,
 * no new dependency" scope for Labs dashboards.
 *
 * @param {Object} props
 * @param {number[]} props.data
 * @param {number} [props.width=96]
 * @param {number} [props.height=32]
 * @param {string} [props.color='var(--color-interactive-primary)']
 */
export default function Sparkline({
  data,
  width = 96,
  height = 32,
  color = 'var(--color-interactive-primary)',
}) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data
    .map((value, i) => {
      const x = i * stepX
      const y = height - ((value - min) / range) * height
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline points={points} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
