'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import {
  SegmentedControl,
  SliderField,
  NumberField,
} from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'compound-interest-calculator')

const FREQUENCIES = {
  Annually: 1,
  'Semi-Annually': 2,
  Quarterly: 4,
  Monthly: 12,
}
const FREQUENCY_OPTIONS = Object.keys(FREQUENCIES)

function computeCompoundGrowth({ principal, ratePct, n, years, monthlyContribution }) {
  const totalMonths = Math.round(years * 12)
  // Convert the nominal rate at the chosen compounding frequency into an
  // equivalent effective monthly rate so monthly contributions compound consistently.
  const effMonthlyRate = Math.pow(1 + ratePct / 100 / n, n / 12) - 1

  let balance = principal
  let contributions = 0
  const yearlyValues = [balance]
  const yearlyContributed = [principal]

  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + effMonthlyRate) + monthlyContribution
    contributions += monthlyContribution
    if (m % 12 === 0) {
      yearlyValues.push(balance)
      yearlyContributed.push(principal + contributions)
    }
  }

  const totalInvested = principal + contributions

  return {
    finalAmount: balance,
    totalContributions: contributions,
    totalInvested,
    totalInterest: balance - totalInvested,
    yearlyValues,
    yearlyContributed,
  }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState(8)
  const [frequency, setFrequency] = useState('Annually')
  const [years, setYears] = useState(10)
  const [monthlyContribution, setMonthlyContribution] = useState('0')

  const result = useMemo(
    () =>
      computeCompoundGrowth({
        principal: Number(principal) || 0,
        ratePct: rate,
        n: FREQUENCIES[frequency],
        years,
        monthlyContribution: Number(monthlyContribution) || 0,
      }),
    [principal, rate, frequency, years, monthlyContribution]
  )

  const xLabels = result.yearlyValues.map((_, i) => String(i))

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.inputRow}>
          <NumberField
            label="Principal amount"
            value={principal}
            onChange={setPrincipal}
            unit="₹"
            min={0}
          />
          <NumberField
            label="Monthly contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            unit="₹"
            min={0}
          />
        </div>

        <SegmentedControl
          label="Compounding frequency"
          options={FREQUENCY_OPTIONS}
          value={frequency}
          onChange={setFrequency}
        />

        <SliderField
          label="Annual interest rate"
          value={rate}
          onChange={setRate}
          min={0}
          max={20}
          step={0.25}
          unit="%"
        />
        <SliderField
          label="Time horizon"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          unit=" yrs"
        />

        <p className={styles.note}>
          Figures are computed live from the inputs above using standard compound-interest
          formulas — for illustration, not financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Final Amount</span>
          <span className={styles.heroValue}>{formatCurrency(result.finalAmount)}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Contributions</span>
            <span className={styles.statValue}>{formatCurrency(result.totalContributions)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Interest Earned</span>
            <span className={styles.statValue}>{formatCurrency(result.totalInterest)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Invested</span>
            <span className={styles.statValue}>{formatCurrency(result.totalInvested)}</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Growth Over Time</h2>
          <LineChart
            ariaLabel="Total value vs total contributed over time"
            xLabels={xLabels}
            yFormat={(v) => formatCurrency(v)}
            series={[
              { id: 'value', label: 'Total Value', color: '#8b5cf6', values: result.yearlyValues },
              {
                id: 'contributed',
                label: 'Total Contributed',
                color: '#3b82f6',
                values: result.yearlyContributed,
              },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
