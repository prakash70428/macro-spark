'use client'

import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import { MONTHS, CPI, WPI, FOOD_TREND_6M, CORE_TREND_6M, CATEGORY_BREAKDOWN } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'inflation-dashboard')

function trendFor(delta) {
  if (delta > 0.05) return 'up'
  if (delta < -0.05) return 'down'
  return 'flat'
}

function formatDelta(delta) {
  const sign = delta > 0 ? '+' : ''
  return `${sign}${delta.toFixed(1)}pp vs prior month`
}

const CPI_LAST6 = CPI.slice(-6)
const WPI_LAST6 = WPI.slice(-6)
const LATEST_CPI = CPI[CPI.length - 1]
const LATEST_WPI = WPI[WPI.length - 1]
const CPI_DELTA = CPI[CPI.length - 1] - CPI[CPI.length - 2]
const WPI_DELTA = WPI[WPI.length - 1] - WPI[WPI.length - 2]
const FOOD_DELTA = FOOD_TREND_6M[FOOD_TREND_6M.length - 1] - FOOD_TREND_6M[FOOD_TREND_6M.length - 2]
const CORE_DELTA = CORE_TREND_6M[CORE_TREND_6M.length - 1] - CORE_TREND_6M[CORE_TREND_6M.length - 2]
const MAX_CATEGORY_VALUE = Math.max(...CATEGORY_BREAKDOWN.map((c) => c.value))

export default function InflationDashboardPage() {
  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample dataset — illustrative only, not a live feed. Connect a real data provider
        (e.g. MoSPI CPI/WPI releases) to make this live.
      </p>

      <div className={styles.grid}>
        <StatTile
          label="Current CPI YoY"
          value={`${LATEST_CPI.toFixed(1)}%`}
          trendDirection={trendFor(CPI_DELTA)}
          trendLabel={formatDelta(CPI_DELTA)}
          sparklineData={CPI_LAST6}
        />
        <StatTile
          label="Current WPI YoY"
          value={`${LATEST_WPI.toFixed(1)}%`}
          trendDirection={trendFor(WPI_DELTA)}
          trendLabel={formatDelta(WPI_DELTA)}
          sparklineData={WPI_LAST6}
        />
        <StatTile
          label="Food Inflation"
          value={`${FOOD_TREND_6M[FOOD_TREND_6M.length - 1].toFixed(1)}%`}
          trendDirection={trendFor(FOOD_DELTA)}
          trendLabel={formatDelta(FOOD_DELTA)}
          sparklineData={FOOD_TREND_6M}
        />
        <StatTile
          label="Core Inflation"
          value={`${CORE_TREND_6M[CORE_TREND_6M.length - 1].toFixed(1)}%`}
          trendDirection={trendFor(CORE_DELTA)}
          trendLabel={formatDelta(CORE_DELTA)}
          sparklineData={CORE_TREND_6M}
        />
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.resultTitle}>CPI vs WPI — Trailing 24 Months</h2>
        <LineChart
          ariaLabel="CPI vs WPI inflation, trailing 24 months"
          xLabels={MONTHS}
          yFormat={(v) => `${v.toFixed(1)}%`}
          series={[
            { id: 'cpi', label: 'CPI (YoY %)', color: '#3b82f6', values: CPI },
            { id: 'wpi', label: 'WPI (YoY %)', color: '#f59e0b', values: WPI },
          ]}
        />
      </div>

      <div className={styles.breakdownCard}>
        <h2 className={styles.resultTitle}>Latest Month — Category Breakdown</h2>
        <div className={styles.bars}>
          {CATEGORY_BREAKDOWN.map((item) => (
            <div className={styles.barRow} key={item.label}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${(item.value / MAX_CATEGORY_VALUE) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
              <span className={styles.barValue}>{item.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </LabToolLayout>
  )
}
