'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SegmentedControl } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import ScatterChart from '@/components/features/labs/charts/ScatterChart'
import { correlationStrength, linearRegression, pearsonCorrelation } from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { RATE_EVENTS, RETURN_FIELD_BY_SECTOR, SECTORS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'interest-rate-impact-model')

function formatBps(v) {
  const sign = v > 0 ? '+' : ''
  return `${sign}${v.toFixed(0)} bps`
}

function formatPct(decimal) {
  const pct = decimal * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

export default function InterestRateImpactModelPage() {
  const [sectorId, setSectorId] = useState(SECTORS[0].id)
  const sector = SECTORS.find((s) => s.id === sectorId)

  const analysis = useMemo(() => {
    const field = RETURN_FIELD_BY_SECTOR[sectorId]
    const xs = RATE_EVENTS.map((e) => e.deltaBps)
    const ys = RATE_EVENTS.map((e) => e[field])
    const r = pearsonCorrelation(xs, ys)
    const regression = linearRegression(xs, ys)
    const points = RATE_EVENTS.map((e) => ({ x: e.deltaBps, y: e[field], label: e.date }))
    return { r, regression, points }
  }, [sectorId])

  const strength = correlationStrength(analysis.r)
  const direction = analysis.r < 0 ? 'negative' : analysis.r > 0 ? 'positive' : 'no'
  const per100bps = analysis.regression.slope * 100

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SegmentedControl
          label="Sector"
          options={SECTORS.map((s) => s.label)}
          value={sector.label}
          onChange={(label) => setSectorId(SECTORS.find((s) => s.label === label).id)}
        />
        <p className={styles.note}>
          {sector.description} Each point is one RBI Monetary Policy Committee rate decision since
          2019 ({RATE_EVENTS.length} decisions), plotted against the sector&apos;s approximate
          3-month forward return. Correlation, regression, and R² below are computed live from this
          dataset — see this tool&apos;s source for data methodology.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.grid}>
          <StatTile
            label="Correlation Coefficient (r)"
            value={analysis.r.toFixed(2)}
            trendDirection={analysis.r < 0 ? 'down' : analysis.r > 0 ? 'up' : 'flat'}
            trendLabel={`${strength} ${direction}`}
          />
          <StatTile label="R² (variance explained)" value={analysis.regression.r2.toFixed(2)} />
          <StatTile
            label="Regression Slope"
            value={formatPct(per100bps)}
            trendLabel="return per +100bps"
            trendDirection={per100bps < 0 ? 'down' : per100bps > 0 ? 'up' : 'flat'}
          />
          <StatTile label="Sample Size" value={`n = ${RATE_EVENTS.length}`} />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Repo Rate Change vs. {sector.label} Return</h2>
          <ScatterChart
            points={analysis.points}
            regression={analysis.regression}
            xLabel="Repo Rate Change (bps)"
            yLabel="3-Month Sector Return"
            xFormat={formatBps}
            yFormat={(v) => `${(v * 100).toFixed(0)}%`}
            color={sector.color}
          />
        </div>

        <div className={styles.findingCard}>
          <h2 className={styles.resultTitle}>Finding</h2>
          <p className={styles.finding}>
            A correlation coefficient of <strong>{analysis.r.toFixed(2)}</strong> indicates a{' '}
            <strong>
              {strength} {direction}
            </strong>{' '}
            relationship between RBI repo rate changes and {sector.label} returns over this sample:
            the regression estimates a {formatPct(per100bps)} average return for every +100 bps of
            repo rate change, explaining {(analysis.regression.r2 * 100).toFixed(0)}% of the
            variance in 3-month returns (R² = {analysis.regression.r2.toFixed(2)}).
          </p>
        </div>
      </div>
    </LabToolLayout>
  )
}
