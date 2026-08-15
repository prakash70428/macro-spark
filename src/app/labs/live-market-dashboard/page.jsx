'use client'

import { useMemo } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import Sparkline from '@/components/features/labs/Sparkline'
import { LABS_TOOLS } from '../data'
import { INDICES } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'live-market-dashboard')

function pctChange(from, to) {
  if (!from) return 0
  return (to - from) / from
}

function formatPct(decimal) {
  const pct = decimal * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

function trendFor(decimal) {
  if (decimal > 0.0005) return 'up'
  if (decimal < -0.0005) return 'down'
  return 'flat'
}

function formatLevel(value) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export default function LiveMarketDashboardPage() {
  const tickers = useMemo(() => {
    return INDICES.map((index) => {
      const { series } = index
      const last = series[series.length - 1]
      const prev = series[series.length - 2]
      const weekAgo = series[series.length - 7]
      return {
        ...index,
        last,
        dailyChange: pctChange(prev, last),
        weeklyChange: pctChange(weekAgo, last),
      }
    })
  }, [])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample series — illustrative only, not a live feed. Index/sector names are used
        only as generic labels for this sample ticker layout. Connect a real feed (e.g. an
        NSE/BSE market data API) to make this live.
      </p>

      <div className={styles.grid}>
        {tickers.map((t) => (
          <div className={styles.statCard} key={t.id}>
            <div className={styles.cardHeader}>
              <span className={styles.name}>{t.name}</span>
              <span
                className={
                  trendFor(t.dailyChange) === 'up'
                    ? styles.badgeUp
                    : trendFor(t.dailyChange) === 'down'
                      ? styles.badgeDown
                      : styles.badgeFlat
                }
              >
                {formatPct(t.dailyChange)}
              </span>
            </div>
            <span className={styles.level}>{formatLevel(t.last)}</span>
            <div className={styles.metaRow}>
              <span
                className={
                  trendFor(t.weeklyChange) === 'up'
                    ? styles.weeklyUp
                    : trendFor(t.weeklyChange) === 'down'
                      ? styles.weeklyDown
                      : styles.weeklyFlat
                }
              >
                Weekly {formatPct(t.weeklyChange)}
              </span>
            </div>
            <div className={styles.sparklineWrap}>
              <Sparkline
                data={t.series}
                color={
                  trendFor(t.dailyChange) === 'down'
                    ? 'var(--color-danger, #ef4444)'
                    : 'var(--color-success, #10b981)'
                }
              />
            </div>
          </div>
        ))}
      </div>
    </LabToolLayout>
  )
}
