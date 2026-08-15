'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'earnings-analyzer')

const CURRENT_DEFAULTS = { revenue: '1150', netProfit: '138', eps: '13.8' }
const PRIOR_DEFAULTS = { revenue: '1000', netProfit: '120', eps: '12.0' }

function growth(cur, prior) {
  return prior > 0 ? (cur - prior) / prior : null
}

function formatPct(value) {
  if (value === null) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${(value * 100).toFixed(1)}%`
}

function trendFor(value) {
  if (value === null) return 'flat'
  return value > 0.005 ? 'up' : value < -0.005 ? 'down' : 'flat'
}

export default function EarningsAnalyzerPage() {
  const [current, setCurrent] = useState(CURRENT_DEFAULTS)
  const [prior, setPrior] = useState(PRIOR_DEFAULTS)

  function updateCurrent(key, value) {
    setCurrent((prev) => ({ ...prev, [key]: value }))
  }
  function updatePrior(key, value) {
    setPrior((prev) => ({ ...prev, [key]: value }))
  }

  const analysis = useMemo(() => {
    const curRevenue = Number(current.revenue) || 0
    const curProfit = Number(current.netProfit) || 0
    const curEps = Number(current.eps) || 0
    const priorRevenue = Number(prior.revenue) || 0
    const priorProfit = Number(prior.netProfit) || 0
    const priorEps = Number(prior.eps) || 0

    const revenueGrowth = growth(curRevenue, priorRevenue)
    const profitGrowth = growth(curProfit, priorProfit)
    const epsGrowth = growth(curEps, priorEps)

    const curMargin = curRevenue > 0 ? curProfit / curRevenue : null
    const priorMargin = priorRevenue > 0 ? priorProfit / priorRevenue : null
    const marginChangePp =
      curMargin !== null && priorMargin !== null ? (curMargin - priorMargin) * 100 : null

    const flags = []

    if (revenueGrowth !== null && revenueGrowth < 0) {
      flags.push('Revenue declined year-over-year.')
    }
    if (revenueGrowth !== null && profitGrowth !== null) {
      if (revenueGrowth > 0 && profitGrowth < 0) {
        flags.push('Profit fell despite revenue growth — cost pressure is compressing margins.')
      } else if (profitGrowth > revenueGrowth + 2) {
        flags.push('Profit is growing faster than revenue — margin expansion.')
      } else if (revenueGrowth > profitGrowth + 2) {
        flags.push('Revenue is outpacing profit growth — margins are under pressure.')
      }
    }
    if (marginChangePp !== null) {
      if (marginChangePp > 1) flags.push(`Net margin expanded by ${marginChangePp.toFixed(1)}pp.`)
      else if (marginChangePp < -1)
        flags.push(`Net margin contracted by ${Math.abs(marginChangePp).toFixed(1)}pp.`)
    }
    if (
      epsGrowth !== null &&
      profitGrowth !== null &&
      Math.abs(epsGrowth - profitGrowth) * 100 > 3
    ) {
      flags.push(
        'EPS growth diverges from net profit growth — likely a change in shares outstanding (dilution or buyback).'
      )
    }
    if (flags.length === 0) {
      flags.push('No notable divergences flagged — growth and margins moved in line with each other.')
    }

    const bottomLine =
      revenueGrowth !== null && profitGrowth !== null
        ? revenueGrowth >= 0 && profitGrowth >= 0
          ? `Revenue grew ${formatPct(revenueGrowth)} and net profit grew ${formatPct(profitGrowth)} year-over-year — a ${profitGrowth >= revenueGrowth ? 'margin-accretive' : 'margin-diluting'} quarter overall.`
          : `This period shows ${revenueGrowth < 0 ? 'a revenue decline' : 'revenue growth'} alongside ${profitGrowth < 0 ? 'a profit decline' : 'profit growth'} — worth reviewing the underlying drivers before drawing conclusions.`
        : 'Enter both periods’ figures to see a computed takeaway.'

    return { revenueGrowth, profitGrowth, epsGrowth, curMargin, priorMargin, marginChangePp, flags, bottomLine }
  }, [current, prior])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.periodGrid}>
          <div>
            <p className={styles.fieldLabel}>Current period</p>
            <div className={styles.fieldsCol}>
              <NumberField
                label="Revenue"
                unit="₹ Cr"
                value={current.revenue}
                onChange={(v) => updateCurrent('revenue', v)}
                min={0}
              />
              <NumberField
                label="Net Profit"
                unit="₹ Cr"
                value={current.netProfit}
                onChange={(v) => updateCurrent('netProfit', v)}
              />
              <NumberField
                label="EPS"
                unit="₹"
                value={current.eps}
                onChange={(v) => updateCurrent('eps', v)}
              />
            </div>
          </div>
          <div>
            <p className={styles.fieldLabel}>Prior period (YoY comparison)</p>
            <div className={styles.fieldsCol}>
              <NumberField
                label="Revenue"
                unit="₹ Cr"
                value={prior.revenue}
                onChange={(v) => updatePrior('revenue', v)}
                min={0}
              />
              <NumberField
                label="Net Profit"
                unit="₹ Cr"
                value={prior.netProfit}
                onChange={(v) => updatePrior('netProfit', v)}
              />
              <NumberField
                label="EPS"
                unit="₹"
                value={prior.eps}
                onChange={(v) => updatePrior('eps', v)}
              />
            </div>
          </div>
        </div>

        <p className={styles.note}>
          Growth, margin change, and the flags below are computed live from the figures above using
          straightforward YoY comparison formulas — the flags are rule-based (not AI-generated), for
          illustration and education, not investment advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.grid}>
          <StatTile
            label="Revenue Growth (YoY)"
            value={formatPct(analysis.revenueGrowth)}
            trendDirection={trendFor(analysis.revenueGrowth)}
          />
          <StatTile
            label="Net Profit Growth (YoY)"
            value={formatPct(analysis.profitGrowth)}
            trendDirection={trendFor(analysis.profitGrowth)}
          />
          <StatTile
            label="EPS Growth (YoY)"
            value={formatPct(analysis.epsGrowth)}
            trendDirection={trendFor(analysis.epsGrowth)}
          />
          <StatTile
            label="Net Margin"
            value={analysis.curMargin !== null ? `${(analysis.curMargin * 100).toFixed(1)}%` : '—'}
            trendDirection={trendFor(analysis.marginChangePp)}
            trendLabel={
              analysis.marginChangePp !== null
                ? `${analysis.marginChangePp > 0 ? '+' : ''}${analysis.marginChangePp.toFixed(1)}pp YoY`
                : undefined
            }
          />
        </div>

        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Signals</h2>
          <ul className={styles.flagList}>
            {analysis.flags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>

        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Bottom Line</h2>
          <p className={styles.resultBody}>{analysis.bottomLine}</p>
        </div>
      </div>
    </LabToolLayout>
  )
}
