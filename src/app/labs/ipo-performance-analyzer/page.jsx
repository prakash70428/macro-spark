'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { calcTotalReturn } from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { IPOS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'ipo-performance-analyzer')

const COLUMNS = [
  { key: 'company', label: 'Company', sortable: false },
  { key: 'sector', label: 'Sector', sortable: false },
  { key: 'listingGain', label: 'Listing Gain', sortable: true },
  { key: 'return1m', label: '1-Month', sortable: true },
  { key: 'return6m', label: '6-Month', sortable: true },
  { key: 'return1y', label: '1-Year', sortable: true },
]

function formatPct(decimal) {
  const pct = decimal * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

function formatRupee(value) {
  return `₹${value.toFixed(0)}`
}

function trendFor(decimal) {
  if (decimal > 0.005) return 'up'
  if (decimal < -0.005) return 'down'
  return 'flat'
}

function withReturns(ipo) {
  return {
    ...ipo,
    listingGain: calcTotalReturn(ipo.issuePrice, ipo.listingPrice),
    return1m: calcTotalReturn(ipo.issuePrice, ipo.price1m),
    return6m: calcTotalReturn(ipo.issuePrice, ipo.price6m),
    return1y: calcTotalReturn(ipo.issuePrice, ipo.price1y),
  }
}

const ROWS = IPOS.map(withReturns)

function sectorBreakdown() {
  const bySector = new Map()
  for (const row of ROWS) {
    if (!bySector.has(row.sector)) bySector.set(row.sector, [])
    bySector.get(row.sector).push(row.return1y)
  }
  return [...bySector.entries()]
    .map(([sector, returns]) => ({
      sector,
      avgReturn1y: returns.reduce((sum, r) => sum + r, 0) / returns.length,
      count: returns.length,
    }))
    .sort((a, b) => b.avgReturn1y - a.avgReturn1y)
}

const SECTOR_BREAKDOWN = sectorBreakdown()
const MAX_ABS_SECTOR_RETURN = Math.max(...SECTOR_BREAKDOWN.map((s) => Math.abs(s.avgReturn1y)))

export default function IpoPerformanceAnalyzerPage() {
  const [sortKey, setSortKey] = useState('listingGain')
  const [sortDir, setSortDir] = useState('desc')
  const [selectedId, setSelectedId] = useState(ROWS[0].id)

  const sortedRows = useMemo(() => {
    const rows = [...ROWS]
    rows.sort((a, b) => {
      const diff = a[sortKey] - b[sortKey]
      return sortDir === 'asc' ? diff : -diff
    })
    return rows
  }, [sortKey, sortDir])

  const selected = ROWS.find((r) => r.id === selectedId) ?? ROWS[0]

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        Dataset of {ROWS.length} major Indian mainboard IPOs, compiled from public listing records.
        Every return below is computed live from issue/listing/{'→'}1yr prices — click a row for a
        full price trajectory and return breakdown.
      </p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key}>
                  {col.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      {sortKey === col.key && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr
                key={row.id}
                className={row.id === selectedId ? styles.rowSelected : styles.row}
                onClick={() => setSelectedId(row.id)}
              >
                <td className={styles.companyCell}>{row.company}</td>
                <td className={styles.sectorCell}>{row.sector}</td>
                <td className={trendClass(row.listingGain, styles)}>
                  {formatPct(row.listingGain)}
                </td>
                <td className={trendClass(row.return1m, styles)}>{formatPct(row.return1m)}</td>
                <td className={trendClass(row.return6m, styles)}>{formatPct(row.return6m)}</td>
                <td className={trendClass(row.return1y, styles)}>{formatPct(row.return1y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.results}>
        <div className={styles.detailCard}>
          <h2 className={styles.resultTitle}>{selected.company}</h2>
          <p className={styles.detailSub}>
            {selected.sector} &middot; Listed {selected.listingDate}
          </p>

          <div className={styles.grid}>
            <StatTile
              label="Issue Price"
              value={formatRupee(selected.issuePrice)}
              trendDirection="flat"
            />
            <StatTile
              label="Listing Gain"
              value={formatPct(selected.listingGain)}
              trendDirection={trendFor(selected.listingGain)}
              trendLabel="vs. issue price"
            />
            <StatTile
              label="1-Month Return"
              value={formatPct(selected.return1m)}
              trendDirection={trendFor(selected.return1m)}
              trendLabel="vs. issue price"
            />
            <StatTile
              label="6-Month Return"
              value={formatPct(selected.return6m)}
              trendDirection={trendFor(selected.return6m)}
              trendLabel="vs. issue price"
            />
            <StatTile
              label="1-Year Return"
              value={formatPct(selected.return1y)}
              trendDirection={trendFor(selected.return1y)}
              trendLabel="vs. issue price"
            />
          </div>

          <div className={styles.chartWrap}>
            <LineChart
              ariaLabel={`${selected.company} price trajectory`}
              xLabels={['Issue', 'Listing', '+1mo', '+6mo', '+1yr']}
              yFormat={(v) => `₹${v.toFixed(0)}`}
              series={[
                {
                  id: selected.id,
                  label: selected.company,
                  color: 'var(--color-interactive-primary)',
                  values: [
                    selected.issuePrice,
                    selected.listingPrice,
                    selected.price1m,
                    selected.price6m,
                    selected.price1y,
                  ],
                },
              ]}
            />
          </div>
        </div>

        <div className={styles.breakdownCard}>
          <h2 className={styles.resultTitle}>Average 1-Year Return by Sector</h2>
          <div className={styles.bars}>
            {SECTOR_BREAKDOWN.map((s) => {
              const widthPct = (Math.abs(s.avgReturn1y) / MAX_ABS_SECTOR_RETURN) * 100
              return (
                <div className={styles.barRow} key={s.sector}>
                  <span className={styles.barLabel}>
                    {s.sector} <span className={styles.barCount}>({s.count})</span>
                  </span>
                  <div className={styles.barTrack}>
                    <div
                      className={s.avgReturn1y >= 0 ? styles.barFillUp : styles.barFillDown}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <span className={styles.barValue}>{formatPct(s.avgReturn1y)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </LabToolLayout>
  )
}

function trendClass(decimal, styles) {
  if (decimal > 0.005) return styles.cellUp
  if (decimal < -0.005) return styles.cellDown
  return styles.cellFlat
}
