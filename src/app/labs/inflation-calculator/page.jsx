'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SliderField, NumberField } from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'inflation-calculator')

function computeInflation({ amount, years, ratePct }) {
  const rate = ratePct / 100
  const equivalentValue = amount * Math.pow(1 + rate, years)
  const realValueToday = amount / Math.pow(1 + rate, years)
  const purchasingPowerLostPct = (1 - 1 / Math.pow(1 + rate, years)) * 100

  const nominalSeries = []
  const realSeries = []
  for (let y = 0; y <= years; y++) {
    nominalSeries.push(amount)
    realSeries.push(amount / Math.pow(1 + rate, y))
  }

  return { equivalentValue, realValueToday, purchasingPowerLostPct, nominalSeries, realSeries }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState('100000')
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(6)

  const result = useMemo(
    () =>
      computeInflation({
        amount: Number(amount) || 0,
        years,
        ratePct: rate,
      }),
    [amount, years, rate]
  )

  const xLabels = result.nominalSeries.map((_, i) => String(i))

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField label="Amount" value={amount} onChange={setAmount} unit="₹" min={0} />
        <SliderField
          label="Number of years"
          value={years}
          onChange={setYears}
          min={1}
          max={50}
          step={1}
          unit=" yrs"
        />
        <SliderField
          label="Average annual inflation rate"
          value={rate}
          onChange={setRate}
          min={1}
          max={15}
          step={0.25}
          unit="%"
        />

        <p className={styles.note}>
          Figures are computed live from the inputs above by compounding the inflation rate over
          time — for illustration, not financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Equivalent Value in {years} Years</span>
          <span className={styles.heroValue}>{formatCurrency(result.equivalentValue)}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Purchasing Power Lost</span>
            <span className={styles.statValue}>{result.purchasingPowerLostPct.toFixed(1)}%</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Real Value of Amount Today</span>
            <span className={styles.statValue}>{formatCurrency(result.realValueToday)}</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Eroding Purchasing Power</h2>
          <LineChart
            ariaLabel="Nominal amount versus its real inflation-adjusted value over time"
            xLabels={xLabels}
            yFormat={(v) => formatCurrency(v)}
            series={[
              { id: 'nominal', label: 'Nominal Value', color: '#3b82f6', values: result.nominalSeries },
              { id: 'real', label: 'Real Value', color: '#ef4444', values: result.realSeries },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
