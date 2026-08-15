'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SliderField, NumberField } from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'sip-calculator')

function computeSIP({ monthlyInvestment, annualReturnPct, years, stepUpPct }) {
  const monthlyRate = annualReturnPct / 100 / 12
  let balance = 0
  let invested = 0
  let currentMonthly = monthlyInvestment

  const yearlyInvested = [0]
  const yearlyValue = [0]

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      balance = balance * (1 + monthlyRate) + currentMonthly
      invested += currentMonthly
    }
    yearlyInvested.push(invested)
    yearlyValue.push(balance)
    currentMonthly = currentMonthly * (1 + stepUpPct / 100)
  }

  const wealthGained = balance - invested

  return {
    maturityValue: balance,
    totalInvested: invested,
    wealthGained,
    wealthGainedPct: invested > 0 ? (wealthGained / invested) * 100 : 0,
    yearlyInvested,
    yearlyValue,
  }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000')
  const [annualReturn, setAnnualReturn] = useState(12)
  const [years, setYears] = useState(15)
  const [stepUp, setStepUp] = useState(0)

  const result = useMemo(
    () =>
      computeSIP({
        monthlyInvestment: Number(monthlyInvestment) || 0,
        annualReturnPct: annualReturn,
        years,
        stepUpPct: stepUp,
      }),
    [monthlyInvestment, annualReturn, years, stepUp]
  )

  const xLabels = result.yearlyValue.map((_, i) => String(i))

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField
          label="Monthly investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          unit="₹"
          min={100}
        />

        <SliderField
          label="Expected annual return"
          value={annualReturn}
          onChange={setAnnualReturn}
          min={1}
          max={30}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Investment duration"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          unit=" yrs"
        />
        <SliderField
          label="Annual step-up"
          value={stepUp}
          onChange={setStepUp}
          min={0}
          max={20}
          step={1}
          unit="%"
        />

        <p className={styles.note}>
          Figures are computed live from the inputs above using the standard SIP future-value
          formula — for illustration, not financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Maturity Value</span>
          <span className={styles.heroValue}>{formatCurrency(result.maturityValue)}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Invested</span>
            <span className={styles.statValue}>{formatCurrency(result.totalInvested)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Wealth Gained</span>
            <span className={styles.statValue}>{formatCurrency(result.wealthGained)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Wealth Gained %</span>
            <span className={styles.statValue}>{result.wealthGainedPct.toFixed(1)}%</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Invested vs Total Value</h2>
          <LineChart
            ariaLabel="SIP invested amount vs total value by year"
            xLabels={xLabels}
            yFormat={(v) => formatCurrency(v)}
            series={[
              { id: 'value', label: 'Total Value', color: '#8b5cf6', values: result.yearlyValue },
              {
                id: 'invested',
                label: 'Total Invested',
                color: '#3b82f6',
                values: result.yearlyInvested,
              },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
