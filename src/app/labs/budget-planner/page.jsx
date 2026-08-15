'use client'

import { useRef, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, TextField } from '@/components/features/labs/LabInputGroup'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'budget-planner')

const CATEGORY_COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#ec4899', '#14b8a6']

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function BudgetPlannerPage() {
  const [income, setIncome] = useState('60000')
  const [categories, setCategories] = useState([
    { id: 1, label: 'Rent', amount: 18000 },
    { id: 2, label: 'Groceries', amount: 8000 },
    { id: 3, label: 'Transport', amount: 4000 },
    { id: 4, label: 'Entertainment', amount: 3000 },
    { id: 5, label: 'Savings', amount: 10000 },
  ])
  const nextId = useRef(6)

  function updateCategory(id, field, value) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  function addCategory() {
    const id = nextId.current++
    setCategories((prev) => [...prev, { id, label: '', amount: 0 }])
  }

  function removeCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const incomeValue = Number(income) || 0
  const totalAllocated = categories.reduce((sum, c) => sum + (Number(c.amount) || 0), 0)
  const surplus = incomeValue - totalAllocated
  const recommendedSavings = incomeValue * 0.2
  const projectedAnnualSavings = Math.max(0, surplus) * 12

  const allocatedSegments = categories
    .filter((c) => (Number(c.amount) || 0) > 0)
    .map((c, i) => ({
      label: c.label || 'Untitled',
      weight: totalAllocated > 0 ? ((Number(c.amount) || 0) / totalAllocated) * 100 : 0,
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }))

  const recommendedSegments = [
    { label: 'Needs (50%)', weight: 50, color: '#8b5cf6' },
    { label: 'Wants (30%)', weight: 30, color: '#3b82f6' },
    { label: 'Savings (20%)', weight: 20, color: '#10b981' },
  ]

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField label="Monthly income" value={income} onChange={setIncome} unit="₹" min={0} />

        <div className={styles.categoriesBlock}>
          <p className={styles.categoriesLabel}>Expense categories</p>
          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <div className={styles.categoryRow} key={category.id}>
                <TextField
                  value={category.label}
                  onChange={(v) => updateCategory(category.id, 'label', v)}
                  placeholder="Category name"
                />
                <NumberField
                  value={category.amount}
                  onChange={(v) => updateCategory(category.id, 'amount', v)}
                  placeholder="Amount"
                  unit="₹"
                  min={0}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeCategory(category.id)}
                  aria-label={`Remove ${category.label || 'category'}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addCategory}>
            + Add category
          </button>
        </div>

        <p className={styles.note}>
          Figures are computed live from the income and categories above — for illustration, not
          financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Monthly Surplus / Deficit</span>
          <span
            className={
              surplus < 0 ? `${styles.heroValue} ${styles.heroValueNegative}` : styles.heroValue
            }
          >
            {formatCurrency(surplus)}
          </span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Allocated</span>
            <span className={styles.statValue}>{formatCurrency(totalAllocated)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Recommended Savings (20%)</span>
            <span className={styles.statValue}>{formatCurrency(recommendedSavings)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Projected Annual Savings</span>
            <span className={styles.statValue}>{formatCurrency(projectedAnnualSavings)}</span>
          </div>
        </div>

        <div className={styles.allocationCard}>
          <h2 className={styles.resultTitle}>Your Allocation vs the 50/30/20 Rule</h2>

          <p className={styles.barCaption}>Your categories ({formatCurrency(totalAllocated)})</p>
          <div className={styles.stackedBar}>
            {allocatedSegments.map((slice) => (
              <div
                key={slice.label}
                className={styles.stackedSegment}
                style={{ width: `${slice.weight}%`, background: slice.color }}
                title={`${slice.label}: ${formatCurrency((slice.weight / 100) * totalAllocated)}`}
              />
            ))}
          </div>
          <div className={styles.legend}>
            {allocatedSegments.map((slice) => (
              <div className={styles.legendItem} key={slice.label}>
                <span className={styles.legendDot} style={{ background: slice.color }} />
                {slice.label} — {slice.weight.toFixed(0)}%
              </div>
            ))}
          </div>

          <p className={styles.barCaption}>
            Recommended 50/30/20 split ({formatCurrency(incomeValue)})
          </p>
          <div className={styles.stackedBar}>
            {recommendedSegments.map((slice) => (
              <div
                key={slice.label}
                className={styles.stackedSegment}
                style={{ width: `${slice.weight}%`, background: slice.color }}
                title={`${slice.label}: ${formatCurrency((slice.weight / 100) * incomeValue)}`}
              />
            ))}
          </div>
          <div className={styles.legend}>
            {recommendedSegments.map((slice) => (
              <div className={styles.legendItem} key={slice.label}>
                <span className={styles.legendDot} style={{ background: slice.color }} />
                {slice.label} — {formatCurrency((slice.weight / 100) * incomeValue)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LabToolLayout>
  )
}
