'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import {
  SegmentedControl,
  SliderField,
  NumberField,
} from '@/components/features/labs/LabInputGroup'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'black-scholes-calculator')

// Abramowitz-Stegun approximation of the standard normal CDF.
function normCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp((-x * x) / 2)
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  if (x > 0) p = 1 - p
  return p
}

function normPDF(x) {
  return Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI)
}

function computeBlackScholes({ S, K, T, sigmaPct, rPct, type }) {
  const sigma = sigmaPct / 100
  const r = rPct / 100
  const sqrtT = Math.sqrt(T)

  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT)
  const d2 = d1 - sigma * sqrtT

  const discK = K * Math.exp(-r * T)
  const callPrice = S * normCDF(d1) - discK * normCDF(d2)
  const putPrice = discK * normCDF(-d2) - S * normCDF(-d1)

  const gamma = normPDF(d1) / (S * sigma * sqrtT)
  const vega = (S * normPDF(d1) * sqrtT) / 100

  const callDelta = normCDF(d1)
  const putDelta = normCDF(d1) - 1
  // Theta expressed per calendar day (annual theta / 365).
  const callTheta = (-(S * normPDF(d1) * sigma) / (2 * sqrtT) - r * discK * normCDF(d2)) / 365
  const putTheta = (-(S * normPDF(d1) * sigma) / (2 * sqrtT) + r * discK * normCDF(-d2)) / 365
  // discK already equals K * e^(-rT), so Rho should not multiply by K again.
  const callRho = (T * discK * normCDF(d2)) / 100
  const putRho = (-T * discK * normCDF(-d2)) / 100

  const isCall = type === 'Call'

  return {
    callPrice,
    putPrice,
    price: isCall ? callPrice : putPrice,
    delta: isCall ? callDelta : putDelta,
    gamma,
    vega,
    theta: isCall ? callTheta : putTheta,
    rho: isCall ? callRho : putRho,
  }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${value.toFixed(2)}`
}

export default function BlackScholesCalculatorPage() {
  const [spot, setSpot] = useState('1000')
  const [strike, setStrike] = useState('1000')
  const [expiry, setExpiry] = useState(1)
  const [volatility, setVolatility] = useState(25)
  const [riskFreeRate, setRiskFreeRate] = useState(7)
  const [optionType, setOptionType] = useState('Call')

  const result = useMemo(
    () =>
      computeBlackScholes({
        S: Number(spot) || 0.01,
        K: Number(strike) || 0.01,
        T: expiry,
        sigmaPct: volatility,
        rPct: riskFreeRate,
        type: optionType,
      }),
    [spot, strike, expiry, volatility, riskFreeRate, optionType]
  )

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.inputRow}>
          <NumberField label="Spot price" value={spot} onChange={setSpot} unit="₹" min={0} />
          <NumberField label="Strike price" value={strike} onChange={setStrike} unit="₹" min={0} />
        </div>

        <SegmentedControl
          label="Option type"
          options={['Call', 'Put']}
          value={optionType}
          onChange={setOptionType}
        />

        <SliderField
          label="Time to expiry"
          value={expiry}
          onChange={setExpiry}
          min={0.05}
          max={3}
          step={0.05}
          unit=" yrs"
        />
        <SliderField
          label="Volatility (σ)"
          value={volatility}
          onChange={setVolatility}
          min={5}
          max={100}
          step={1}
          unit="%"
        />
        <SliderField
          label="Risk-free rate"
          value={riskFreeRate}
          onChange={setRiskFreeRate}
          min={0}
          max={15}
          step={0.25}
          unit="%"
        />

        <p className={styles.note}>
          Figures are computed live from the inputs above using the Black-Scholes model — for
          illustration, not financial advice.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>{optionType} Option Price</span>
          <span className={styles.heroValue}>{formatCurrency(result.price)}</span>
        </div>

        <div className={styles.comparisonRow}>
          <div className={styles.comparisonCard}>
            <span className={styles.statLabel}>Call Price</span>
            <span className={styles.statValue}>{formatCurrency(result.callPrice)}</span>
          </div>
          <div className={styles.comparisonCard}>
            <span className={styles.statLabel}>Put Price</span>
            <span className={styles.statValue}>{formatCurrency(result.putPrice)}</span>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Delta</span>
            <span className={styles.statValue}>{result.delta.toFixed(4)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Gamma</span>
            <span className={styles.statValue}>{result.gamma.toFixed(4)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Theta (per day)</span>
            <span className={styles.statValue}>{result.theta.toFixed(4)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Vega (per 1% vol)</span>
            <span className={styles.statValue}>{result.vega.toFixed(4)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Rho (per 1% rate)</span>
            <span className={styles.statValue}>{result.rho.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </LabToolLayout>
  )
}
