'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SliderField, NumberField } from '@/components/features/labs/LabInputGroup'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'dcf-calculator')

function computeDCF({ baseFCF, growthRate, discountRate, terminalGrowth, years, shares }) {
  const g = growthRate / 100
  const r = discountRate / 100
  const tg = terminalGrowth / 100

  let fcf = baseFCF
  let pvSum = 0
  for (let i = 1; i <= years; i++) {
    fcf = fcf * (1 + g)
    pvSum += fcf / Math.pow(1 + r, i)
  }

  const terminalValue = (fcf * (1 + tg)) / (r - tg)
  const pvTerminal = terminalValue / Math.pow(1 + r, years)
  const enterpriseValue = pvSum + pvTerminal
  const perShare = shares > 0 ? enterpriseValue / shares : null

  return { enterpriseValue, pvTerminal, pvSum, perShare }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return value.toLocaleString('en-IN', { maximumFractionDigits: 1 })
}

export default function DcfCalculatorPage() {
  const [baseFCF, setBaseFCF] = useState('500')
  const [shares, setShares] = useState('100')
  const [growthRate, setGrowthRate] = useState(10)
  const [discountRate, setDiscountRate] = useState(11)
  const [terminalGrowth, setTerminalGrowth] = useState(4)
  const [years, setYears] = useState(5)
  const [status, setStatus] = useState('idle') // idle | calculating | done

  const invalidAssumptions = terminalGrowth >= discountRate

  function handleCalculate() {
    if (invalidAssumptions) return
    setStatus('calculating')
    setTimeout(() => setStatus('done'), 700)
  }

  const result = computeDCF({
    baseFCF: Number(baseFCF) || 0,
    shares: Number(shares) || 0,
    growthRate,
    discountRate,
    terminalGrowth,
    years,
  })

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.inputRow}>
          <NumberField
            label="Base Free Cash Flow"
            value={baseFCF}
            onChange={(v) => {
              setBaseFCF(v)
              setStatus('idle')
            }}
            unit="₹ Cr"
            min={0}
          />
          <NumberField
            label="Shares Outstanding"
            value={shares}
            onChange={(v) => {
              setShares(v)
              setStatus('idle')
            }}
            unit="Cr"
            min={1}
          />
        </div>

        <SliderField
          label="Revenue growth rate"
          value={growthRate}
          onChange={(v) => {
            setGrowthRate(v)
            setStatus('idle')
          }}
          min={0}
          max={30}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Discount rate (WACC)"
          value={discountRate}
          onChange={(v) => {
            setDiscountRate(v)
            setStatus('idle')
          }}
          min={4}
          max={20}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Terminal growth rate"
          value={terminalGrowth}
          onChange={(v) => {
            setTerminalGrowth(v)
            setStatus('idle')
          }}
          min={0}
          max={8}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Projection period"
          value={years}
          onChange={(v) => {
            setYears(v)
            setStatus('idle')
          }}
          min={3}
          max={10}
          step={1}
          unit=" yrs"
        />

        {invalidAssumptions && (
          <p className={styles.warning}>
            Terminal growth rate must be lower than the discount rate.
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="primary"
            disabled={invalidAssumptions}
            loading={status === 'calculating'}
            onClick={handleCalculate}
          >
            Calculate Intrinsic Value
          </Button>
        </div>

        <p className={styles.note}>
          This is a UI preview computing a simplified DCF from the assumptions above — it is not
          investment advice and does not use real company data.
        </p>
      </div>

      {status === 'done' && !invalidAssumptions && (
        <div className={styles.results}>
          <div className={styles.heroCard}>
            <span className={styles.heroLabel}>Intrinsic Value per Share</span>
            <span className={styles.heroValue}>
              {result.perShare !== null ? `₹${formatCurrency(result.perShare)}` : '—'}
            </span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Enterprise Value</span>
              <span className={styles.statValue}>₹{formatCurrency(result.enterpriseValue)} Cr</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>PV of Cash Flows</span>
              <span className={styles.statValue}>₹{formatCurrency(result.pvSum)} Cr</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>PV of Terminal Value</span>
              <span className={styles.statValue}>₹{formatCurrency(result.pvTerminal)} Cr</span>
            </div>
          </div>

          <p className={styles.sensitivityNote}>
            Sensitivity: a 1% increase in the discount rate or a 1% decrease in revenue growth would
            meaningfully lower this estimate — intrinsic value from a DCF model is highly sensitive
            to the discount and terminal growth assumptions.
          </p>
        </div>
      )}
    </LabToolLayout>
  )
}
