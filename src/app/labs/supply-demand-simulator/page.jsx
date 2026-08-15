'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'supply-demand-simulator')

const CHART_STEPS = 20 // number of price points plotted (21 points incl. 0)

function formatCurrency(value, digits = 2) {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: digits })}`
}

export default function SupplyDemandSimulatorPage() {
  const [a, setA] = useState(120) // demand intercept
  const [b, setB] = useState(2) // demand slope
  const [c, setC] = useState(10) // supply intercept
  const [d, setD] = useState(3) // supply slope
  const [tax, setTax] = useState('0')

  const analysis = useMemo(() => {
    const t = Number(tax) || 0

    // No-tax equilibrium
    const pStar = (a - c) / (b + d)
    const qStar = a - b * pStar

    // With-tax equilibrium: a - bP = c + d(P - t)
    const pTax = (a - c + d * t) / (b + d)
    const qTax = a - b * pTax
    const consumerPrice = pTax
    const producerPrice = pTax - t
    const taxRevenue = t > 0 ? t * qTax : 0
    const deadweightLoss = t > 0 ? 0.5 * t * (qStar - qTax) : 0

    const equilibriumPrice = t > 0 ? consumerPrice : pStar
    const equilibriumQuantity = t > 0 ? qTax : qStar

    // Chart range
    const maxP = Math.max(a / b, (a - c + d * t) / (b + d) + t, 5) * 1.3
    const priceStep = maxP / CHART_STEPS
    const pricePoints = Array.from({ length: CHART_STEPS + 1 }, (_, i) => i * priceStep)
    const demandValues = pricePoints.map((p) => Math.max(0, a - b * p))
    const supplyValues = pricePoints.map((p) => Math.max(0, c + d * (p - t)))

    return {
      t,
      pStar,
      qStar,
      pTax,
      qTax,
      consumerPrice,
      producerPrice,
      taxRevenue,
      deadweightLoss,
      equilibriumPrice,
      equilibriumQuantity,
      pricePoints,
      demandValues,
      supplyValues,
    }
  }, [a, b, c, d, tax])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SliderField
          label='Demand intercept "a"'
          value={a}
          onChange={setA}
          min={50}
          max={200}
          step={1}
        />
        <SliderField
          label='Demand slope "b"'
          value={b}
          onChange={setB}
          min={0.5}
          max={5}
          step={0.5}
        />
        <SliderField
          label='Supply intercept "c"'
          value={c}
          onChange={setC}
          min={0}
          max={100}
          step={1}
        />
        <SliderField
          label='Supply slope "d"'
          value={d}
          onChange={setD}
          min={0.5}
          max={5}
          step={0.5}
        />
        <NumberField label="Per-unit tax" value={tax} onChange={setTax} unit="₹" min={0} step={0.5} />

        <p className={styles.note}>
          This is a simplified educational model using illustrative elasticities/multipliers, not
          an official RBI/government forecasting model — figures are computed live from your
          inputs but should not be used for real policy decisions. Demand is modeled as Qd = a −
          b·P and supply as Qs = c + d·P; a per-unit tax shifts the effective supply curve by
          requiring producers to receive P − t for the same quantity supplied.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Equilibrium Price</span>
          <span className={styles.heroValue}>{formatCurrency(analysis.equilibriumPrice)}</span>
        </div>

        <div className={styles.grid}>
          <StatTile label="Equilibrium Quantity" value={analysis.equilibriumQuantity.toFixed(1)} />
          <StatTile
            label="Tax Revenue"
            value={analysis.t > 0 ? formatCurrency(analysis.taxRevenue) : '—'}
          />
          <StatTile
            label="Deadweight Loss"
            value={analysis.t > 0 ? formatCurrency(analysis.deadweightLoss) : '—'}
          />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Supply &amp; Demand Curves</h2>
          <LineChart
            ariaLabel="Demand and supply quantity by price"
            xLabels={analysis.pricePoints.map((p) => formatCurrency(p, 0))}
            yFormat={(v) => v.toFixed(0)}
            series={[
              { id: 'demand', label: 'Demand (Qd)', color: '#3b82f6', values: analysis.demandValues },
              { id: 'supply', label: 'Supply (Qs)', color: '#f59e0b', values: analysis.supplyValues },
            ]}
          />
          <p className={styles.chartNote}>
            X-axis represents price (₹); Y-axis represents quantity. The curves cross at the
            equilibrium point.
          </p>
        </div>
      </div>
    </LabToolLayout>
  )
}
