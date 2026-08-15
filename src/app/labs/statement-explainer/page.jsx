'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField } from '@/components/features/labs/LabInputGroup'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'statement-explainer')

const FIELDS = [
  { key: 'revenue', label: 'Revenue', unit: '₹ Cr' },
  { key: 'cogs', label: 'Cost of Goods Sold', unit: '₹ Cr' },
  { key: 'operatingIncome', label: 'Operating Income (EBIT)', unit: '₹ Cr' },
  { key: 'interestExpense', label: 'Interest Expense', unit: '₹ Cr' },
  { key: 'netIncome', label: 'Net Income', unit: '₹ Cr' },
  { key: 'currentAssets', label: 'Current Assets', unit: '₹ Cr' },
  { key: 'inventory', label: 'Inventory', unit: '₹ Cr' },
  { key: 'currentLiabilities', label: 'Current Liabilities', unit: '₹ Cr' },
  { key: 'totalAssets', label: 'Total Assets', unit: '₹ Cr' },
  { key: 'totalLiabilities', label: 'Total Liabilities', unit: '₹ Cr' },
  { key: 'totalEquity', label: 'Total Equity', unit: '₹ Cr' },
]

const DEFAULTS = {
  revenue: '1000',
  cogs: '600',
  operatingIncome: '180',
  interestExpense: '30',
  netIncome: '120',
  currentAssets: '450',
  inventory: '120',
  currentLiabilities: '300',
  totalAssets: '1200',
  totalLiabilities: '650',
  totalEquity: '550',
}

function safeDiv(a, b) {
  return b > 0 ? a / b : null
}

function pct(value) {
  return value === null ? '—' : `${(value * 100).toFixed(1)}%`
}

function ratio(value) {
  return value === null ? '—' : `${value.toFixed(2)}x`
}

function computeRatios(v) {
  const grossProfit = v.revenue - v.cogs

  const rows = [
    {
      key: 'grossMargin',
      label: 'Gross Margin',
      value: safeDiv(grossProfit, v.revenue),
      format: pct,
      good: (x) => x !== null && x >= 0.35,
      bad: (x) => x !== null && x < 0.15,
      goodText: 'Healthy pricing power over direct costs.',
      badText: 'Thin gross margin — direct costs are eating most of revenue.',
    },
    {
      key: 'operatingMargin',
      label: 'Operating Margin',
      value: safeDiv(v.operatingIncome, v.revenue),
      format: pct,
      good: (x) => x !== null && x >= 0.15,
      bad: (x) => x !== null && x < 0.05,
      goodText: 'Core operations are strongly profitable.',
      badText: 'Operating margin is thin — overheads are consuming most of the operating profit.',
    },
    {
      key: 'netMargin',
      label: 'Net Margin',
      value: safeDiv(v.netIncome, v.revenue),
      format: pct,
      good: (x) => x !== null && x >= 0.12,
      bad: (x) => x !== null && x < 0.03,
      goodText: 'Strong bottom-line profitability.',
      badText: 'Net margin is weak after interest and other costs.',
    },
    {
      key: 'currentRatio',
      label: 'Current Ratio',
      value: safeDiv(v.currentAssets, v.currentLiabilities),
      format: ratio,
      good: (x) => x !== null && x >= 1.5,
      bad: (x) => x !== null && x < 1,
      goodText: 'Comfortable liquidity to cover short-term obligations.',
      badText: 'Current liabilities exceed current assets — a potential liquidity concern.',
    },
    {
      key: 'quickRatio',
      label: 'Quick Ratio',
      value: safeDiv(v.currentAssets - v.inventory, v.currentLiabilities),
      format: ratio,
      good: (x) => x !== null && x >= 1,
      bad: (x) => x !== null && x < 0.5,
      goodText: 'Can cover short-term liabilities without relying on inventory.',
      badText: 'Excluding inventory, liquid assets are tight against short-term liabilities.',
    },
    {
      key: 'debtToEquity',
      label: 'Debt-to-Equity',
      value: safeDiv(v.totalLiabilities, v.totalEquity),
      format: ratio,
      good: (x) => x !== null && x <= 0.7,
      bad: (x) => x !== null && x > 1.5,
      goodText: 'Conservative leverage relative to shareholder equity.',
      badText: 'High leverage — liabilities are large relative to equity.',
    },
    {
      key: 'roe',
      label: 'Return on Equity',
      value: safeDiv(v.netIncome, v.totalEquity),
      format: pct,
      good: (x) => x !== null && x >= 0.15,
      bad: (x) => x !== null && x < 0.05,
      goodText: 'Strong returns generated on shareholder capital.',
      badText: 'Weak returns generated on shareholder capital.',
    },
    {
      key: 'roa',
      label: 'Return on Assets',
      value: safeDiv(v.netIncome, v.totalAssets),
      format: pct,
      good: (x) => x !== null && x >= 0.06,
      bad: (x) => x !== null && x < 0.02,
      goodText: 'Efficient use of the asset base to generate profit.',
      badText: 'Assets are generating relatively little profit.',
    },
    {
      key: 'interestCoverage',
      label: 'Interest Coverage',
      value: safeDiv(v.operatingIncome, v.interestExpense),
      format: ratio,
      good: (x) => x !== null && x >= 5,
      bad: (x) => x !== null && x < 2,
      goodText: 'Operating income comfortably covers interest obligations.',
      badText: 'Operating income barely covers interest — debt servicing is strained.',
    },
  ]

  return rows
}

export default function StatementExplainerPage() {
  const [values, setValues] = useState(DEFAULTS)

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const numeric = useMemo(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, Number(values[f.key]) || 0])),
    [values]
  )

  const rows = useMemo(() => computeRatios(numeric), [numeric])

  const strengths = rows.filter((r) => r.good(r.value))
  const concerns = rows.filter((r) => r.bad(r.value))

  const healthLabel =
    strengths.length > concerns.length
      ? 'Strong'
      : concerns.length > strengths.length
        ? 'Weak'
        : 'Mixed'

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <p className={styles.fieldLabel}>Enter the company&apos;s figures (₹ crore)</p>
        <div className={styles.fieldsGrid}>
          {FIELDS.map((f) => (
            <NumberField
              key={f.key}
              label={f.label}
              unit={f.unit}
              value={values[f.key]}
              onChange={(v) => update(f.key, v)}
              min={f.key === 'interestExpense' ? 0.01 : 0}
            />
          ))}
        </div>

        <p className={styles.note}>
          Ratios are computed live from the figures above using standard liquidity, leverage, and
          profitability formulas — the interpretation is rule-based (not AI-generated), for
          illustration and education, not investment advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Financial Health Summary</h2>
          <p className={styles.resultBody}>
            Based on the ratios computed below, this company&apos;s financial profile reads as{' '}
            <strong>{healthLabel}</strong> — {strengths.length} of {rows.length} ratios fall in a
            healthy range, and {concerns.length} warrant a closer look.
          </p>
        </div>

        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Strengths</h2>
          {strengths.length === 0 ? (
            <p className={styles.resultBody}>No ratios currently fall in the strong range.</p>
          ) : (
            <ul className={styles.ratioList}>
              {strengths.map((r) => (
                <li key={r.key}>
                  <strong>
                    {r.label}: {r.format(r.value)}
                  </strong>{' '}
                  — {r.goodText}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Concerns</h2>
          {concerns.length === 0 ? (
            <p className={styles.resultBody}>No ratios currently fall in the concerning range.</p>
          ) : (
            <ul className={styles.ratioList}>
              {concerns.map((r) => (
                <li key={r.key}>
                  <strong>
                    {r.label}: {r.format(r.value)}
                  </strong>{' '}
                  — {r.badText}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>All Ratios</h2>
          <ul className={styles.ratioList}>
            {rows.map((r) => (
              <li key={r.key}>
                {r.label}: <strong>{r.format(r.value)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LabToolLayout>
  )
}
