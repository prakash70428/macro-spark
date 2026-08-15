'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SliderField, NumberField } from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'loan-emi-calculator')

function computeEMI({ principal, annualRatePct, years }) {
  const r = annualRatePct / 100 / 12
  const n = Math.round(years * 12)
  const emi =
    r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  let balance = principal
  const yearlyBalance = [principal]
  for (let m = 1; m <= n; m++) {
    const interestPortion = balance * r
    const principalPortion = emi - interestPortion
    balance = Math.max(0, balance - principalPortion)
    if (m % 12 === 0) yearlyBalance.push(balance)
  }

  const totalPayment = emi * n
  const totalInterest = totalPayment - principal

  return { emi, totalPayment, totalInterest, principal, yearlyBalance }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function LoanEmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('2500000')
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(15)

  const result = useMemo(
    () =>
      computeEMI({
        principal: Number(loanAmount) || 0,
        annualRatePct: rate,
        years,
      }),
    [loanAmount, rate, years]
  )

  const xLabels = result.yearlyBalance.map((_, i) => String(i))

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} unit="₹" min={0} />
        <SliderField
          label="Annual interest rate"
          value={rate}
          onChange={setRate}
          min={1}
          max={20}
          step={0.1}
          unit="%"
        />
        <SliderField
          label="Loan tenure"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          unit=" yrs"
        />

        <p className={styles.note}>
          Figures are computed live from the inputs above using the standard EMI amortization
          formula — for illustration, not financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Monthly EMI</span>
          <span className={styles.heroValue}>{formatCurrency(result.emi)}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Interest Payable</span>
            <span className={styles.statValue}>{formatCurrency(result.totalInterest)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Payment</span>
            <span className={styles.statValue}>{formatCurrency(result.totalPayment)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Principal</span>
            <span className={styles.statValue}>{formatCurrency(result.principal)}</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Outstanding Balance Over Time</h2>
          <LineChart
            ariaLabel="Outstanding loan balance declining over the years"
            xLabels={xLabels}
            yFormat={(v) => formatCurrency(v)}
            series={[
              {
                id: 'balance',
                label: 'Outstanding Balance',
                color: '#ef4444',
                values: result.yearlyBalance,
              },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
