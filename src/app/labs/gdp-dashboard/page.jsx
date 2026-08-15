'use client'

import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import { QUARTERS, GDP_GROWTH, SECTOR_BREAKDOWN } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'gdp-dashboard')

function trendFor(value) {
  if (value > 0.05) return 'up'
  if (value < -0.05) return 'down'
  return 'flat'
}

const LATEST_GDP = GDP_GROWTH[GDP_GROWTH.length - 1]
const GDP_DELTA = GDP_GROWTH[GDP_GROWTH.length - 1] - GDP_GROWTH[GDP_GROWTH.length - 2]
const GDP_LAST6 = GDP_GROWTH.slice(-6)
const MAX_SECTOR_SHARE = Math.max(...SECTOR_BREAKDOWN.map((s) => s.share))

export default function GdpDashboardPage() {
  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample dataset — illustrative only, not a live feed. Connect a real data provider
        (e.g. MoSPI/NSO GDP releases) to make this live.
      </p>

      <div className={styles.grid}>
        <StatTile
          label="Latest GDP Growth"
          value={`${LATEST_GDP.toFixed(1)}%`}
          trendDirection={trendFor(GDP_DELTA)}
          trendLabel={`${GDP_DELTA > 0 ? '+' : ''}${GDP_DELTA.toFixed(1)}pp vs prior quarter`}
          sparklineData={GDP_LAST6}
        />
        {SECTOR_BREAKDOWN.map((s) => (
          <StatTile
            key={s.label}
            label={`${s.label} Growth`}
            value={`${s.growth.toFixed(1)}%`}
            trendDirection={trendFor(s.growth)}
            trendLabel={`${s.share}% of GVA`}
          />
        ))}
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.resultTitle}>Real GDP Growth — Trailing 20 Quarters</h2>
        <LineChart
          ariaLabel="Real GDP growth YoY, trailing 20 quarters"
          xLabels={QUARTERS}
          yFormat={(v) => `${v.toFixed(0)}%`}
          series={[{ id: 'gdp', label: 'GDP Growth (YoY %)', color: '#3b82f6', values: GDP_GROWTH }]}
        />
      </div>

      <div className={styles.breakdownCard}>
        <h2 className={styles.resultTitle}>Latest Quarter — Sector Share of GVA</h2>
        <div className={styles.bars}>
          {SECTOR_BREAKDOWN.map((item) => (
            <div className={styles.barRow} key={item.label}>
              <span className={styles.barLabel}>
                {item.label} <span className={styles.barSub}>({item.growth.toFixed(1)}% growth)</span>
              </span>
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
