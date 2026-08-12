'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import {
  calcCAGR,
  calcMaxDrawdown,
  calcSharpeRatio,
  calcTotalReturn,
  buildEquityCurve,
} from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { ANNUAL_RETURNS, STRATEGIES, YEARS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'portfolio-backtesting-tool')

const RISK_FREE_RATE = 0.06 // approximate long-run risk-free proxy (T-bill / short govt yield)
const MIN_YEAR = YEARS[0]
const MAX_START_YEAR = YEARS[YEARS.length - 2]
const END_YEAR = YEARS[YEARS.length - 1]

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function formatPct(decimal) {
  const pct = decimal * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

function trendFor(decimal) {
  if (decimal > 0.005) return 'up'
  if (decimal < -0.005) return 'down'
  return 'flat'
}

export default function PortfolioBacktestingToolPage() {
  const [investment, setInvestment] = useState('100000')
  const [startYear, setStartYear] = useState(MIN_YEAR)
  const [selectedIds, setSelectedIds] = useState(STRATEGIES.map((s) => s.id))

  function toggleStrategy(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const activeYears = useMemo(() => YEARS.filter((y) => y >= startYear), [startYear])

  const results = useMemo(() => {
    const principal = Number(investment) || 0
    return STRATEGIES.filter((s) => selectedIds.includes(s.id)).map((strategy) => {
      const returns = activeYears.map((y) => ANNUAL_RETURNS[strategy.id][y])
      const equityCurve = buildEquityCurve(principal, returns)
      const endValue = equityCurve[equityCurve.length - 1]
      const years = returns.length
      return {
        ...strategy,
        returns,
        equityCurve,
        cagr: calcCAGR(principal, endValue, years),
        sharpe: calcSharpeRatio(returns, RISK_FREE_RATE),
        maxDrawdown: calcMaxDrawdown(equityCurve),
        totalReturn: calcTotalReturn(principal, endValue),
        endValue,
      }
    })
  }, [investment, activeYears, selectedIds])

  const chartXLabels = ['Start', ...activeYears.map(String)]

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.chips}>
          {STRATEGIES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={selectedIds.includes(s.id) ? styles.chipActive : styles.chip}
              style={
                selectedIds.includes(s.id) ? { borderColor: s.color, color: s.color } : undefined
              }
              onClick={() => toggleStrategy(s.id)}
              aria-pressed={selectedIds.includes(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.fieldsRow}>
          <NumberField
            label="Initial Investment"
            unit="₹"
            value={investment}
            onChange={setInvestment}
            min={1000}
            step={1000}
          />
          <SliderField
            label={`Backtest From ${startYear} to ${END_YEAR}`}
            value={startYear}
            onChange={setStartYear}
            min={MIN_YEAR}
            max={MAX_START_YEAR}
            step={1}
          />
        </div>

        <p className={styles.note}>
          Backtested against annual index/factor returns compiled from public historical data
          (2010–2025) — see the dataset note in this tool&apos;s source for methodology. CAGR,
          Sharpe ratio, max drawdown, and total return are computed live from the return series for
          the period selected above.
        </p>
      </div>

      {results.length > 0 && (
        <div className={styles.results}>
          <div className={styles.chartCard}>
            <h2 className={styles.resultTitle}>
              Growth of {formatCurrency(Number(investment) || 0)}
            </h2>
            <LineChart
              ariaLabel="Portfolio equity curve by strategy"
              xLabels={chartXLabels}
              yFormat={(v) => formatCurrency(v)}
              series={results.map((r) => ({
                id: r.id,
                label: r.label,
                color: r.color,
                values: r.equityCurve,
              }))}
            />
          </div>

          {results.map((r) => (
            <div className={styles.strategyCard} key={r.id}>
              <h2 className={styles.resultTitle} style={{ color: r.color }}>
                {r.label}
              </h2>
              <div className={styles.grid}>
                <StatTile
                  label="Ending Value"
                  value={formatCurrency(r.endValue)}
                  trendDirection={trendFor(r.totalReturn)}
                  trendLabel={formatPct(r.totalReturn)}
                />
                <StatTile
                  label="CAGR"
                  value={formatPct(r.cagr)}
                  trendDirection={trendFor(r.cagr)}
                />
                <StatTile
                  label="Sharpe Ratio"
                  value={r.sharpe.toFixed(2)}
                  trendDirection={r.sharpe >= 1 ? 'up' : r.sharpe >= 0 ? 'flat' : 'down'}
                  trendLabel={`vs. ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free`}
                />
                <StatTile
                  label="Max Drawdown"
                  value={formatPct(r.maxDrawdown)}
                  trendDirection={r.maxDrawdown < -0.005 ? 'down' : 'flat'}
                  trendLabel="worst peak-to-trough"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </LabToolLayout>
  )
}
