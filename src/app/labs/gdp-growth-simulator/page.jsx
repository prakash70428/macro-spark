'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'gdp-growth-simulator')

const BASE_GDP = 300 // ₹ lakh crore, illustrative representative economy

const COMPONENTS = [
  { id: 'consumption', label: 'Consumption (C)', share: 0.55, color: '#3b82f6' },
  { id: 'investment', label: 'Investment (I)', share: 0.3, color: '#8b5cf6' },
  { id: 'government', label: 'Government Spending (G)', share: 0.11, color: '#f59e0b' },
  { id: 'netExports', label: 'Net Exports (NX)', share: 0.04, color: '#10b981' },
]

function formatPct(value, digits = 2) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 1 })} lakh cr`
}

export default function GdpGrowthSimulatorPage() {
  const [cGrowth, setCGrowth] = useState(6)
  const [iGrowth, setIGrowth] = useState(8)
  const [gGrowth, setGGrowth] = useState(10)
  const [nxGrowth, setNxGrowth] = useState(3)

  const analysis = useMemo(() => {
    const growthByComponent = {
      consumption: cGrowth,
      investment: iGrowth,
      government: gGrowth,
      netExports: nxGrowth,
    }
    const contributions = COMPONENTS.map((c) => ({
      ...c,
      growth: growthByComponent[c.id],
      contribution: c.share * growthByComponent[c.id],
    }))
    const overallGrowth = contributions.reduce((sum, c) => sum + c.contribution, 0)
    const nextYearGdp = BASE_GDP * (1 + overallGrowth / 100)
    const largestDriver = contributions.reduce((max, c) =>
      Math.abs(c.contribution) > Math.abs(max.contribution) ? c : max
    )
    const investmentContribution = contributions.find((c) => c.id === 'investment').contribution
    const maxAbsContribution = Math.max(...contributions.map((c) => Math.abs(c.contribution)), 0.01)
    return { contributions, overallGrowth, nextYearGdp, largestDriver, investmentContribution, maxAbsContribution }
  }, [cGrowth, iGrowth, gGrowth, nxGrowth])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SliderField
          label="Consumption growth"
          value={cGrowth}
          onChange={setCGrowth}
          min={0}
          max={15}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Investment growth"
          value={iGrowth}
          onChange={setIGrowth}
          min={-5}
          max={20}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Government spending growth"
          value={gGrowth}
          onChange={setGGrowth}
          min={0}
          max={20}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Net exports growth"
          value={nxGrowth}
          onChange={setNxGrowth}
          min={-10}
          max={15}
          step={0.5}
          unit="%"
        />

        <p className={styles.note}>
          This is a simplified educational model using illustrative elasticities/multipliers, not
          an official RBI/government forecasting model — figures are computed live from your
          inputs but should not be used for real policy decisions. It assumes a representative
          economy with baseline expenditure shares (Consumption 55%, Investment 30%, Government
          11%, Net Exports 4%) and a starting nominal GDP of {formatCurrency(BASE_GDP)}.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Projected GDP Growth</span>
          <span className={styles.heroValue}>{formatPct(analysis.overallGrowth)}</span>
        </div>

        <div className={styles.grid}>
          <StatTile
            label="Projected Next-Year GDP"
            value={formatCurrency(analysis.nextYearGdp)}
            trendDirection={analysis.overallGrowth >= 0 ? 'up' : 'down'}
            trendLabel={formatPct(analysis.overallGrowth)}
          />
          <StatTile
            label="Largest Growth Driver"
            value={analysis.largestDriver.label}
            trendDirection={analysis.largestDriver.contribution >= 0 ? 'up' : 'down'}
            trendLabel={`${formatPct(analysis.largestDriver.contribution)} pts`}
          />
          <StatTile
            label="Investment Contribution"
            value={`${formatPct(analysis.investmentContribution)} pts`}
            trendDirection={analysis.investmentContribution >= 0 ? 'up' : 'down'}
          />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Contribution to Overall Growth</h2>
          <div className={styles.barList}>
            {analysis.contributions.map((c) => {
              const widthPct = (Math.abs(c.contribution) / analysis.maxAbsContribution) * 100
              return (
                <div className={styles.barRow} key={c.id}>
                  <div className={styles.barLabelRow}>
                    <span className={styles.barLabel}>{c.label}</span>
                    <span className={styles.barValue}>{formatPct(c.contribution)} pts</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${widthPct}%`, background: c.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.legend}>
            {COMPONENTS.map((c) => (
              <div className={styles.legendItem} key={c.id}>
                <span className={styles.legendDot} style={{ background: c.color }} />
                {c.label} — {(c.share * 100).toFixed(0)}% share
              </div>
            ))}
          </div>
        </div>
      </div>
    </LabToolLayout>
  )
}
