'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import {
  calcVolatility,
  calcSharpeRatio,
  calcMaxDrawdown,
  buildEquityCurve,
  pearsonCorrelation,
  linearRegression,
} from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { ANNUAL_RETURNS, BENCHMARK_ID, TICKERS, YEARS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'risk-analytics')
const RISK_FREE_RATE = 0.06
const MIN_WINDOW = 4

function sortinoRatio(returns, riskFree) {
  if (returns.length < 2) return 0
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const downside = returns.map((r) => Math.min(r - riskFree, 0))
  const downsideDev = Math.sqrt(downside.reduce((sum, d) => sum + d * d, 0) / returns.length)
  return downsideDev < 1e-9 ? 0 : (mean - riskFree) / downsideDev
}

function betaOf(assetReturns, marketReturns) {
  const assetVol = calcVolatility(assetReturns)
  const marketVol = calcVolatility(marketReturns)
  if (marketVol < 1e-9) return 0
  return pearsonCorrelation(marketReturns, assetReturns) * (assetVol / marketVol)
}

/** Real trailing (expanding-window) metric series, used to drive each StatTile's sparkline. */
function trailingSeries(assetReturns, marketReturns) {
  const beta = []
  const sharpe = []
  const sortino = []
  const maxDrawdown = []
  const volatility = []

  for (let i = MIN_WINDOW; i <= assetReturns.length; i++) {
    const aSlice = assetReturns.slice(0, i)
    const mSlice = marketReturns.slice(0, i)
    beta.push(betaOf(aSlice, mSlice))
    sharpe.push(calcSharpeRatio(aSlice, RISK_FREE_RATE))
    sortino.push(sortinoRatio(aSlice, RISK_FREE_RATE))
    maxDrawdown.push(calcMaxDrawdown(buildEquityCurve(1, aSlice)) * 100)
    volatility.push(calcVolatility(aSlice) * 100)
  }

  return { beta, sharpe, sortino, maxDrawdown, volatility }
}

function trendFor(current, series) {
  if (series.length < 2) return 'flat'
  const prev = series[series.length - 2]
  if (current > prev + 1e-6) return 'up'
  if (current < prev - 1e-6) return 'down'
  return 'flat'
}

export default function RiskAnalyticsPage() {
  const [selectedId, setSelectedId] = useState('reliance')

  const analysis = useMemo(() => {
    const assetReturns = YEARS.map((y) => ANNUAL_RETURNS[selectedId][y])
    const marketReturns = YEARS.map((y) => ANNUAL_RETURNS[BENCHMARK_ID][y])

    const beta = betaOf(assetReturns, marketReturns)
    const sharpe = calcSharpeRatio(assetReturns, RISK_FREE_RATE)
    const sortino = sortinoRatio(assetReturns, RISK_FREE_RATE)
    const equityCurve = buildEquityCurve(1, assetReturns)
    const maxDrawdown = calcMaxDrawdown(equityCurve) * 100
    const volatility = calcVolatility(assetReturns) * 100
    const marketVolatility = calcVolatility(marketReturns) * 100
    const { r2 } = linearRegression(marketReturns, assetReturns)

    const trails = trailingSeries(assetReturns, marketReturns)

    return {
      beta,
      sharpe,
      sortino,
      maxDrawdown,
      volatility,
      marketVolatility,
      marketRiskPct: r2 * 100,
      specificRiskPct: (1 - r2) * 100,
      trails,
    }
  }, [selectedId])

  const isBenchmark = selectedId === BENCHMARK_ID
  const selectedTicker = TICKERS.find((t) => t.id === selectedId)

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.chips}>
          {TICKERS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={selectedId === t.id ? styles.chipActive : styles.chip}
              style={selectedId === t.id ? { borderColor: t.color, color: t.color } : undefined}
              aria-pressed={selectedId === t.id}
              onClick={() => setSelectedId(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className={styles.note}>
          Computed at runtime from a static annual-return dataset (2016–2025, illustrative
          approximations of real historical behavior — not a live feed) via Beta, Sharpe, Sortino,
          max drawdown, and volatility formulas. Nifty 50 is used as the market benchmark for Beta
          and the risk breakdown below.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.grid}>
          <StatTile
            label="Beta"
            value={analysis.beta.toFixed(2)}
            trendDirection={isBenchmark ? 'flat' : trendFor(analysis.beta, analysis.trails.beta)}
            trendLabel={
              isBenchmark
                ? 'benchmark'
                : analysis.beta > 1
                  ? 'more volatile than market'
                  : 'less volatile than market'
            }
            sparklineData={analysis.trails.beta.slice(-6)}
          />
          <StatTile
            label="Sharpe Ratio"
            value={analysis.sharpe.toFixed(2)}
            trendDirection={trendFor(analysis.sharpe, analysis.trails.sharpe)}
            trendLabel={`vs. ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free`}
            sparklineData={analysis.trails.sharpe.slice(-6)}
          />
          <StatTile
            label="Sortino Ratio"
            value={analysis.sortino.toFixed(2)}
            trendDirection={trendFor(analysis.sortino, analysis.trails.sortino)}
            trendLabel="downside-risk adjusted"
            sparklineData={analysis.trails.sortino.slice(-6)}
          />
          <StatTile
            label="Max Drawdown"
            value={`${analysis.maxDrawdown.toFixed(1)}%`}
            trendDirection={analysis.maxDrawdown < -0.5 ? 'down' : 'flat'}
            trendLabel="worst peak-to-trough (2016–2025)"
            sparklineData={analysis.trails.maxDrawdown.slice(-6)}
          />
          <StatTile
            label="Volatility (Annualized)"
            value={`${analysis.volatility.toFixed(1)}%`}
            trendDirection={analysis.volatility > analysis.marketVolatility ? 'up' : 'flat'}
            trendLabel={`vs ${analysis.marketVolatility.toFixed(1)}% market`}
            sparklineData={analysis.trails.volatility.slice(-6)}
          />
        </div>

        <div className={styles.breakdownCard}>
          <h2 className={styles.resultTitle}>
            Risk Breakdown — {selectedTicker?.label}
          </h2>
          <div className={styles.bars}>
            <div className={styles.barRow}>
              <span className={styles.barLabel}>Systematic (Market) Risk</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${analysis.marketRiskPct}%`, background: '#8b5cf6' }}
                />
              </div>
              <span className={styles.barValue}>{analysis.marketRiskPct.toFixed(0)}%</span>
            </div>
            <div className={styles.barRow}>
              <span className={styles.barLabel}>Idiosyncratic (Stock-Specific) Risk</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${analysis.specificRiskPct}%`, background: '#f59e0b' }}
                />
              </div>
              <span className={styles.barValue}>{analysis.specificRiskPct.toFixed(0)}%</span>
            </div>
          </div>
          <p className={styles.note} style={{ marginTop: 'var(--space-4)' }}>
            The systematic share is the R² of {selectedTicker?.label}&apos;s returns regressed
            against the Nifty 50 benchmark — the portion of its return variance explained by
            broad-market moves. The remainder is stock-specific risk that diversification could
            reduce.
          </p>
        </div>
      </div>
    </LabToolLayout>
  )
}
