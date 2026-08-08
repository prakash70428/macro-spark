'use client'

import { useRef, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import {
  SegmentedControl,
  SliderField,
  TextField,
  NumberField,
} from '@/components/features/labs/LabInputGroup'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'portfolio-optimizer')

const RISK_LEVELS = ['Low', 'Medium', 'High']

// Sample allocation model — illustrative only, not a real optimizer.
const MOCK_ALLOCATIONS = {
  Low: {
    mix: [
      { label: 'Bonds', weight: 55, color: '#3b82f6' },
      { label: 'Equity', weight: 25, color: '#8b5cf6' },
      { label: 'Gold', weight: 12, color: '#f59e0b' },
      { label: 'Cash', weight: 8, color: '#10b981' },
    ],
    expectedReturn: '6.5%',
    volatility: '4.8%',
    sharpe: '0.92',
  },
  Medium: {
    mix: [
      { label: 'Equity', weight: 45, color: '#8b5cf6' },
      { label: 'Bonds', weight: 35, color: '#3b82f6' },
      { label: 'Gold', weight: 12, color: '#f59e0b' },
      { label: 'Cash', weight: 8, color: '#10b981' },
    ],
    expectedReturn: '10.2%',
    volatility: '9.6%',
    sharpe: '1.05',
  },
  High: {
    mix: [
      { label: 'Equity', weight: 70, color: '#8b5cf6' },
      { label: 'Bonds', weight: 15, color: '#3b82f6' },
      { label: 'Gold', weight: 8, color: '#f59e0b' },
      { label: 'Cash', weight: 7, color: '#10b981' },
    ],
    expectedReturn: '14.8%',
    volatility: '17.3%',
    sharpe: '0.86',
  },
}

export default function PortfolioOptimizerPage() {
  const [riskTolerance, setRiskTolerance] = useState('Medium')
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [assets, setAssets] = useState([
    { id: 1, ticker: 'NIFTYBEES', weight: 50 },
    { id: 2, ticker: 'GOLDBEES', weight: 20 },
  ])
  const [status, setStatus] = useState('idle') // idle | optimizing | done
  const nextAssetId = useRef(3)

  function updateAsset(id, field, value) {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  function addAsset() {
    const id = nextAssetId.current++
    setAssets((prev) => [...prev, { id, ticker: '', weight: 0 }])
  }

  function removeAsset(id) {
    setAssets((prev) => prev.filter((a) => a.id !== id))
  }

  function handleOptimize() {
    setStatus('optimizing')
    setTimeout(() => setStatus('done'), 1000)
  }

  const result = MOCK_ALLOCATIONS[riskTolerance]

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SegmentedControl
          label="Risk tolerance"
          options={RISK_LEVELS}
          value={riskTolerance}
          onChange={(v) => {
            setRiskTolerance(v)
            setStatus('idle')
          }}
        />

        <SliderField
          label="Expected return target"
          value={expectedReturn}
          onChange={(v) => {
            setExpectedReturn(v)
            setStatus('idle')
          }}
          min={2}
          max={25}
          step={0.5}
          unit="%"
        />

        <div className={styles.assetsBlock}>
          <p className={styles.assetsLabel}>Assets to include</p>
          <div className={styles.assetsList}>
            {assets.map((asset) => (
              <div className={styles.assetRow} key={asset.id}>
                <TextField
                  value={asset.ticker}
                  onChange={(v) => updateAsset(asset.id, 'ticker', v)}
                  placeholder="Ticker, e.g. NIFTYBEES"
                />
                <NumberField
                  value={asset.weight}
                  onChange={(v) => updateAsset(asset.id, 'weight', v)}
                  placeholder="Weight"
                  unit="%"
                  min={0}
                  max={100}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeAsset(asset.id)}
                  aria-label={`Remove ${asset.ticker || 'asset'}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addAsset}>
            + Add asset
          </button>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" loading={status === 'optimizing'} onClick={handleOptimize}>
            Optimize Portfolio
          </Button>
        </div>

        <p className={styles.note}>
          This is a UI preview — allocation below is a sample model based on your selected risk
          tolerance, not a real optimization of the assets you entered.
        </p>
      </div>

      {status === 'done' && (
        <div className={styles.results}>
          <div className={styles.allocationCard}>
            <h2 className={styles.resultTitle}>Suggested Allocation</h2>
            <div className={styles.stackedBar}>
              {result.mix.map((slice) => (
                <div
                  key={slice.label}
                  className={styles.stackedSegment}
                  style={{ width: `${slice.weight}%`, background: slice.color }}
                  title={`${slice.label}: ${slice.weight}%`}
                />
              ))}
            </div>
            <div className={styles.legend}>
              {result.mix.map((slice) => (
                <div className={styles.legendItem} key={slice.label}>
                  <span className={styles.legendDot} style={{ background: slice.color }} />
                  {slice.label} — {slice.weight}%
                </div>
              ))}
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Expected Return</span>
              <span className={styles.statValue}>{result.expectedReturn}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Volatility</span>
              <span className={styles.statValue}>{result.volatility}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Sharpe Ratio</span>
              <span className={styles.statValue}>{result.sharpe}</span>
            </div>
          </div>
        </div>
      )}
    </LabToolLayout>
  )
}
