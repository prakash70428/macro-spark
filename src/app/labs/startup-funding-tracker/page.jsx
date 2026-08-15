'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import { LABS_TOOLS } from '../data'
import { FUNDING_ROUNDS, SECTORS, STAGES } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'startup-funding-tracker')

const SECTOR_OPTIONS = ['All', ...SECTORS]
const STAGE_OPTIONS = ['All', ...STAGES]

function formatCrore(value) {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 1 })} cr`
}

export default function StartupFundingTrackerPage() {
  const [sector, setSector] = useState('All')
  const [stage, setStage] = useState('All')

  const filtered = useMemo(() => {
    return FUNDING_ROUNDS.filter((r) => {
      if (sector !== 'All' && r.sector !== sector) return false
      if (stage !== 'All' && r.stage !== stage) return false
      return true
    })
  }, [sector, stage])

  const stats = useMemo(() => {
    if (filtered.length === 0) {
      return { total: 0, count: 0, average: 0, largest: 0 }
    }
    const total = filtered.reduce((sum, r) => sum + r.amountCr, 0)
    const largest = Math.max(...filtered.map((r) => r.amountCr))
    return { total, count: filtered.length, average: total / filtered.length, largest }
  }, [filtered])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Static sample dataset — illustrative only, not a live feed. All startup names below are
        fictional sample entities invented for this demonstration, not real companies. Connect a
        real data provider to make this live.
      </p>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Sector</span>
        <div className={styles.chips}>
          {SECTOR_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={sector === s ? styles.chipActive : styles.chip}
              onClick={() => setSector(s)}
              aria-pressed={sector === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Stage</span>
        <div className={styles.chips}>
          {STAGE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={stage === s ? styles.chipActive : styles.chip}
              onClick={() => setStage(s)}
              aria-pressed={stage === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        <StatTile label="Total Funding" value={formatCrore(stats.total)} trendDirection="flat" />
        <StatTile label="Number of Rounds" value={String(stats.count)} trendDirection="flat" />
        <StatTile
          label="Average Round Size"
          value={formatCrore(stats.average)}
          trendDirection="flat"
        />
        <StatTile label="Largest Round" value={formatCrore(stats.largest)} trendDirection="flat" />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Startup</th>
              <th>Sector</th>
              <th>Stage</th>
              <th>Amount</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.name}>
                <td className={styles.nameCell}>{r.name}</td>
                <td className={styles.sectorCell}>{r.sector}</td>
                <td className={styles.stageCell}>{r.stage}</td>
                <td className={styles.amountCell}>{formatCrore(r.amountCr)}</td>
                <td className={styles.monthCell}>{r.month}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyCell}>
                  No rounds match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LabToolLayout>
  )
}
