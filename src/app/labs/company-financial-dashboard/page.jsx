'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { calcCAGR, calcTotalReturn } from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { COMPANIES, YEARS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'company-financial-dashboard')

function formatCrore(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')} cr`
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

export default function CompanyFinancialDashboardPage() {
  const [selectedId, setSelectedId] = useState(COMPANIES[0].id)

  const company = COMPANIES.find((c) => c.id === selectedId) ?? COMPANIES[0]

  const metrics = useMemo(() => {
    const { revenue, netProfit } = company
    const years = revenue.length - 1
    const latestRevenue = revenue[revenue.length - 1]
    const latestProfit = netProfit[netProfit.length - 1]
    return {
      latestRevenue,
      latestProfit,
      revenueCagr: calcCAGR(revenue[0], latestRevenue, years),
      profitTotalReturn: calcTotalReturn(netProfit[0], latestProfit),
      netMargin: latestProfit / latestRevenue,
    }
  }, [company])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample dataset — illustrative only, not a live feed. The companies below (
        {COMPANIES.map((c) => c.name).join(', ')}) are fictional sample entities invented for this
        demonstration, not real companies. Connect a real data provider (e.g. exchange filings) to
        make this live.
      </p>

      <div className={styles.chips}>
        {COMPANIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={selectedId === c.id ? styles.chipActive : styles.chip}
            style={selectedId === c.id ? { borderColor: c.color, color: c.color } : undefined}
            onClick={() => setSelectedId(c.id)}
            aria-pressed={selectedId === c.id}
          >
            {c.name} <span className={styles.chipSector}>· {c.sector}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <StatTile label="Latest Revenue" value={formatCrore(metrics.latestRevenue)} trendDirection="flat" />
        <StatTile
          label="Revenue CAGR (5yr)"
          value={formatPct(metrics.revenueCagr)}
          trendDirection={trendFor(metrics.revenueCagr)}
        />
        <StatTile
          label="Latest Net Profit"
          value={formatCrore(metrics.latestProfit)}
          trendDirection={trendFor(metrics.profitTotalReturn)}
          trendLabel={`${formatPct(metrics.profitTotalReturn)} over 5yr`}
        />
        <StatTile
          label="Net Margin"
          value={`${(metrics.netMargin * 100).toFixed(1)}%`}
          trendDirection={trendFor(metrics.netMargin - 0.1)}
        />
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.resultTitle} style={{ color: company.color }}>
          {company.name} — Revenue vs Net Profit
        </h2>
        <LineChart
          ariaLabel={`${company.name} revenue and net profit, 5 years`}
          xLabels={YEARS}
          yFormat={(v) => `₹${Math.round(v)}cr`}
          series={[
            { id: 'revenue', label: 'Revenue', color: company.color, values: company.revenue },
            { id: 'netProfit', label: 'Net Profit', color: '#f59e0b', values: company.netProfit },
          ]}
        />
      </div>
    </LabToolLayout>
  )
}
