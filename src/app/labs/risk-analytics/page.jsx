'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { TextField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'risk-analytics')

// Static sample metrics — illustrative only, not computed from real market data.
const MOCK_METRICS = [
  {
    label: 'Beta',
    value: '1.18',
    trendDirection: 'up',
    trendLabel: 'more volatile than market',
    sparklineData: [0.95, 1.02, 1.08, 1.1, 1.15, 1.18],
  },
  {
    label: 'Sharpe Ratio',
    value: '1.24',
    trendDirection: 'up',
    trendLabel: '+0.08',
    sparklineData: [0.9, 1.0, 1.05, 1.12, 1.18, 1.24],
  },
  {
    label: 'Sortino Ratio',
    value: '1.61',
    trendDirection: 'up',
    trendLabel: '+0.11',
    sparklineData: [1.2, 1.3, 1.38, 1.45, 1.53, 1.61],
  },
  {
    label: 'Max Drawdown',
    value: '-18.4%',
    trendDirection: 'down',
    trendLabel: 'worst peak-to-trough',
    sparklineData: [-5, -9, -14, -12, -16, -18.4],
  },
  {
    label: 'Volatility (Annualized)',
    value: '22.6%',
    trendDirection: 'flat',
    trendLabel: 'vs 19.8% market avg',
    sparklineData: [20.1, 21.0, 21.8, 22.2, 22.4, 22.6],
  },
]

const RISK_BREAKDOWN = [
  { label: 'Market Risk', weight: 42, color: '#8b5cf6' },
  { label: 'Sector Risk', weight: 26, color: '#3b82f6' },
  { label: 'Company-Specific Risk', weight: 21, color: '#f59e0b' },
  { label: 'Liquidity Risk', weight: 11, color: '#10b981' },
]

export default function RiskAnalyticsPage() {
  const [ticker, setTicker] = useState('')
  const [status, setStatus] = useState('idle') // idle | analyzing | done

  function handleAnalyze() {
    if (!ticker.trim()) return
    setStatus('analyzing')
    setTimeout(() => setStatus('done'), 900)
  }

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <TextField
          label="Stock or portfolio ticker"
          value={ticker}
          onChange={(v) => {
            setTicker(v)
            setStatus('idle')
          }}
          placeholder="e.g. RELIANCE, TCS, or a portfolio name"
        />

        <div className={styles.actions}>
          <Button
            variant="primary"
            disabled={!ticker.trim()}
            loading={status === 'analyzing'}
            onClick={handleAnalyze}
          >
            Analyze Risk
          </Button>
        </div>

        <p className={styles.note}>
          This is a UI preview — metrics below are sample values, not computed from real market
          data for the ticker entered.
        </p>
      </div>

      {status === 'done' && (
        <div className={styles.results}>
          <div className={styles.grid}>
            {MOCK_METRICS.map((metric) => (
              <StatTile key={metric.label} {...metric} />
            ))}
          </div>

          <div className={styles.breakdownCard}>
            <h2 className={styles.resultTitle}>Risk Breakdown</h2>
            <div className={styles.bars}>
              {RISK_BREAKDOWN.map((item) => (
                <div className={styles.barRow} key={item.label}>
                  <span className={styles.barLabel}>{item.label}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${item.weight}%`, background: item.color }}
                    />
                  </div>
                  <span className={styles.barValue}>{item.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </LabToolLayout>
  )
}
