'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SegmentedControl, SliderField } from '@/components/features/labs/LabInputGroup'
import { LABS_TOOLS } from '../data'
import {
  ASSET_CLASSES,
  MAX_VOLATILITY_BY_RISK,
  RISK_FREE_RATE,
  correlationBetween,
} from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'portfolio-optimizer')

const RISK_LEVELS = ['Low', 'Medium', 'High']
const WEIGHT_STEP = 5

function portfolioStats(weightsPct, assets) {
  const weights = weightsPct.map((w) => w / 100)
  const expReturn = assets.reduce((sum, a, i) => sum + weights[i] * a.expectedReturn, 0)

  let variance = 0
  for (let i = 0; i < assets.length; i++) {
    for (let j = 0; j < assets.length; j++) {
      const cov =
        correlationBetween(assets[i].id, assets[j].id) * assets[i].volatility * assets[j].volatility
      variance += weights[i] * weights[j] * cov
    }
  }

  return { expReturn, volatility: Math.sqrt(Math.max(variance, 0)) }
}

/**
 * Real mean-variance (Markowitz) grid search: enumerates every weight
 * combination across the included asset classes in 5% increments, keeps only
 * combinations within the risk tier's max volatility, and returns the one
 * with the highest Sharpe ratio.
 */
function optimizePortfolio(assets, maxVolatility) {
  let best = null

  function consider(weightsPct) {
    const { expReturn, volatility } = portfolioStats(weightsPct, assets)
    if (volatility > maxVolatility + 1e-9) return
    const sharpe = volatility < 1e-6 ? 0 : (expReturn - RISK_FREE_RATE) / volatility
    if (!best || sharpe > best.sharpe) {
      best = { weightsPct, expReturn, volatility, sharpe }
    }
  }

  const n = assets.length
  if (n === 0) return null

  if (n === 1) {
    consider([100])
  } else if (n === 2) {
    for (let a = 0; a <= 100; a += WEIGHT_STEP) consider([a, 100 - a])
  } else if (n === 3) {
    for (let a = 0; a <= 100; a += WEIGHT_STEP)
      for (let b = 0; b <= 100 - a; b += WEIGHT_STEP) consider([a, b, 100 - a - b])
  } else {
    for (let a = 0; a <= 100; a += WEIGHT_STEP)
      for (let b = 0; b <= 100 - a; b += WEIGHT_STEP)
        for (let c = 0; c <= 100 - a - b; c += WEIGHT_STEP)
          consider([a, b, c, 100 - a - b - c])
  }

  return best
}

function formatPct(decimal, digits = 1) {
  return `${(decimal * 100).toFixed(digits)}%`
}

export default function PortfolioOptimizerPage() {
  const [riskTolerance, setRiskTolerance] = useState('Medium')
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [includedIds, setIncludedIds] = useState(ASSET_CLASSES.map((a) => a.id))

  function toggleAsset(id) {
    setIncludedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const includedAssets = useMemo(
    () => ASSET_CLASSES.filter((a) => includedIds.includes(a.id)),
    [includedIds]
  )

  const maxVolatility = MAX_VOLATILITY_BY_RISK[riskTolerance]

  const result = useMemo(() => {
    if (includedAssets.length === 0) return null
    return optimizePortfolio(includedAssets, maxVolatility)
  }, [includedAssets, maxVolatility])

  const mix =
    result &&
    includedAssets
      .map((asset, i) => ({ ...asset, weight: result.weightsPct[i] }))
      .filter((a) => a.weight > 0)

  const targetMet = result ? result.expReturn * 100 >= expectedReturn : false

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SegmentedControl
          label="Risk tolerance"
          options={RISK_LEVELS}
          value={riskTolerance}
          onChange={setRiskTolerance}
        />

        <SliderField
          label="Expected return target"
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={2}
          max={25}
          step={0.5}
          unit="%"
        />

        <div className={styles.assetsBlock}>
          <p className={styles.assetsLabel}>Asset classes to include</p>
          <div className={styles.chips}>
            {ASSET_CLASSES.map((asset) => (
              <button
                key={asset.id}
                type="button"
                className={includedIds.includes(asset.id) ? styles.chipActive : styles.chip}
                style={
                  includedIds.includes(asset.id)
                    ? { borderColor: asset.color, color: asset.color }
                    : undefined
                }
                aria-pressed={includedIds.includes(asset.id)}
                onClick={() => toggleAsset(asset.id)}
              >
                {asset.label}
              </button>
            ))}
          </div>
        </div>

        {includedAssets.length === 0 && (
          <p className={styles.warning}>Include at least one asset class to optimize.</p>
        )}

        <p className={styles.note}>
          Runs a real mean-variance (Markowitz) grid search across the asset classes above, using
          assumed long-run expected return, volatility, and correlation for each (see this tool&apos;s
          dataset file) — it selects the combination with the highest Sharpe ratio that stays within
          your risk tolerance&apos;s volatility limit. Not personalized to specific tickers or live
          market data.
        </p>
      </div>

      {result && mix && (
        <div className={styles.results}>
          <div className={styles.allocationCard}>
            <h2 className={styles.resultTitle}>Optimized Allocation</h2>
            <div className={styles.stackedBar}>
              {mix.map((slice) => (
                <div
                  key={slice.id}
                  className={styles.stackedSegment}
                  style={{ width: `${slice.weight}%`, background: slice.color }}
                  title={`${slice.label}: ${slice.weight}%`}
                />
              ))}
            </div>
            <div className={styles.legend}>
              {mix.map((slice) => (
                <div className={styles.legendItem} key={slice.id}>
                  <span className={styles.legendDot} style={{ background: slice.color }} />
                  {slice.label} — {slice.weight}%
                </div>
              ))}
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Expected Return</span>
              <span className={styles.statValue}>{formatPct(result.expReturn)}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Volatility</span>
              <span className={styles.statValue}>{formatPct(result.volatility)}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Sharpe Ratio</span>
              <span className={styles.statValue}>{result.sharpe.toFixed(2)}</span>
            </div>
          </div>

          {!targetMet && (
            <p className={styles.warning}>
              This risk tolerance can&apos;t reach your {expectedReturn}% return target within its
              volatility limit — the best achievable expected return is{' '}
              {formatPct(result.expReturn)}. Try a higher risk tolerance.
            </p>
          )}
        </div>
      )}
    </LabToolLayout>
  )
}
