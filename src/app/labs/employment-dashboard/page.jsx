'use client'

import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import {
  MONTHS,
  UNEMPLOYMENT_OVERALL,
  UNEMPLOYMENT_URBAN,
  UNEMPLOYMENT_RURAL,
  LFPR_TREND_6M,
  SECTOR_EMPLOYMENT,
} from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'employment-dashboard')

function trendFor(delta) {
  return delta > 0.05 ? 'up' : delta < -0.05 ? 'down' : 'flat'
}

function deltaLabel(delta) {
  const sign = delta > 0 ? '+' : ''
  return `${sign}${delta.toFixed(1)}pp vs prior month`
}

const LATEST_OVERALL = UNEMPLOYMENT_OVERALL[UNEMPLOYMENT_OVERALL.length - 1]
const LATEST_URBAN = UNEMPLOYMENT_URBAN[UNEMPLOYMENT_URBAN.length - 1]
const LATEST_RURAL = UNEMPLOYMENT_RURAL[UNEMPLOYMENT_RURAL.length - 1]
const LATEST_LFPR = LFPR_TREND_6M[LFPR_TREND_6M.length - 1]

const OVERALL_DELTA =
  UNEMPLOYMENT_OVERALL[UNEMPLOYMENT_OVERALL.length - 1] -
  UNEMPLOYMENT_OVERALL[UNEMPLOYMENT_OVERALL.length - 2]
const URBAN_DELTA =
  UNEMPLOYMENT_URBAN[UNEMPLOYMENT_URBAN.length - 1] -
  UNEMPLOYMENT_URBAN[UNEMPLOYMENT_URBAN.length - 2]
const RURAL_DELTA =
  UNEMPLOYMENT_RURAL[UNEMPLOYMENT_RURAL.length - 1] -
  UNEMPLOYMENT_RURAL[UNEMPLOYMENT_RURAL.length - 2]
const LFPR_DELTA = LFPR_TREND_6M[LFPR_TREND_6M.length - 1] - LFPR_TREND_6M[LFPR_TREND_6M.length - 2]

const MAX_SECTOR_SHARE = Math.max(...SECTOR_EMPLOYMENT.map((s) => s.share))

export default function EmploymentDashboardPage() {
  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample dataset — illustrative only, not a live feed. Connect a real data provider
        (e.g. PLFS or CMIE) to make this live. India&apos;s labour force participation rate is
        notably below the global average, which the LFPR figure below is meant to illustrate.
      </p>

      <div className={styles.grid}>
        <StatTile
          label="Current Unemployment Rate"
          value={`${LATEST_OVERALL.toFixed(1)}%`}
          trendDirection={trendFor(OVERALL_DELTA)}
          trendLabel={deltaLabel(OVERALL_DELTA)}
          sparklineData={UNEMPLOYMENT_OVERALL.slice(-6)}
        />
        <StatTile
          label="Urban Unemployment"
          value={`${LATEST_URBAN.toFixed(1)}%`}
          trendDirection={trendFor(URBAN_DELTA)}
          trendLabel={deltaLabel(URBAN_DELTA)}
          sparklineData={UNEMPLOYMENT_URBAN.slice(-6)}
        />
        <StatTile
          label="Rural Unemployment"
          value={`${LATEST_RURAL.toFixed(1)}%`}
          trendDirection={trendFor(RURAL_DELTA)}
          trendLabel={deltaLabel(RURAL_DELTA)}
          sparklineData={UNEMPLOYMENT_RURAL.slice(-6)}
        />
        <StatTile
          label="Labour Force Participation Rate"
          value={`${LATEST_LFPR.toFixed(1)}%`}
          trendDirection={trendFor(LFPR_DELTA)}
          trendLabel={deltaLabel(LFPR_DELTA)}
          sparklineData={LFPR_TREND_6M}
        />
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.resultTitle}>Unemployment Rate — Trailing 24 Months</h2>
        <LineChart
          ariaLabel="Overall, urban, and rural unemployment rate, trailing 24 months"
          xLabels={MONTHS}
          yFormat={(v) => `${v.toFixed(0)}%`}
          series={[
            { id: 'overall', label: 'Overall', color: '#3b82f6', values: UNEMPLOYMENT_OVERALL },
            { id: 'urban', label: 'Urban', color: '#f59e0b', values: UNEMPLOYMENT_URBAN },
            { id: 'rural', label: 'Rural', color: '#10b981', values: UNEMPLOYMENT_RURAL },
          ]}
        />
      </div>

      <div className={styles.breakdownCard}>
        <h2 className={styles.resultTitle}>Sector Employment Split</h2>
        <div className={styles.bars}>
          {SECTOR_EMPLOYMENT.map((item) => (
            <div className={styles.barRow} key={item.label}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${(item.share / MAX_SECTOR_SHARE) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
              <span className={styles.barValue}>{item.share}%</span>
            </div>
          ))}
        </div>
      </div>
    </LabToolLayout>
  )
}
