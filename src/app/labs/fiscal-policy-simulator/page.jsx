'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'fiscal-policy-simulator')

const BASE_GDP = 300 // ₹ lakh crore, illustrative baseline economy
const MPC = 0.7 // marginal propensity to consume, fixed assumption
const RAMP = [0.4, 0.75, 1.0] // multiplier phase-in over 3 years

function formatCr(value, digits = 2) {
  const sign = value > 0 ? '+' : ''
  return `${sign}₹${value.toFixed(digits)} lakh cr`
}

function formatPct(value, digits = 2) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export default function FiscalPolicySimulatorPage() {
  const [deltaG, setDeltaG] = useState('2')
  const [deltaTaxRate, setDeltaTaxRate] = useState(1)
  const [multiplier, setMultiplier] = useState(1.5)

  const analysis = useMemo(() => {
    const dG = Number(deltaG) || 0
    const taxRevenueChange = BASE_GDP * (deltaTaxRate / 100)
    const netFiscalImpulse = dG - taxRevenueChange * MPC
    const fullGdpImpact = multiplier * netFiscalImpulse
    const gdpPath = RAMP.map((r) => BASE_GDP + fullGdpImpact * r)
    const baselinePath = RAMP.map(() => BASE_GDP)
    const deficitImpact = dG - taxRevenueChange
    const deficitPctOfGdp = (deficitImpact / BASE_GDP) * 100

    return {
      dG,
      taxRevenueChange,
      netFiscalImpulse,
      fullGdpImpact,
      fullGdpImpactPct: (fullGdpImpact / BASE_GDP) * 100,
      gdpPath,
      baselinePath,
      deficitImpact,
      deficitPctOfGdp,
    }
  }, [deltaG, deltaTaxRate, multiplier])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField
          label="Change in government spending"
          value={deltaG}
          onChange={setDeltaG}
          unit="₹ lakh cr"
          step={0.5}
        />
        <SliderField
          label="Change in tax rate"
          value={deltaTaxRate}
          onChange={setDeltaTaxRate}
          min={-5}
          max={5}
          step={0.25}
          unit=" pts"
        />
        <SliderField
          label="Fiscal multiplier"
          value={multiplier}
          onChange={setMultiplier}
          min={0.5}
          max={2.5}
          step={0.1}
          unit="x"
        />
        <p className={styles.helper}>
          The fiscal multiplier represents how many rupees of GDP each net rupee of fiscal
          stimulus generates. A multiplier of 1.5x means ₹1 of net fiscal impulse produces ₹1.5 of
          GDP.
        </p>

        <p className={styles.note}>
          This is a simplified educational model using illustrative elasticities/multipliers, not
          an official RBI/government forecasting model — figures are computed live from your
          inputs but should not be used for real policy decisions. Base GDP is fixed at ₹300 lakh
          crore and the marginal propensity to consume is fixed at 0.7 for this model.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>GDP Impact at Full Effect</span>
          <span className={styles.heroValue}>{formatCr(analysis.fullGdpImpact)}</span>
          <span className={styles.heroSub}>{formatPct(analysis.fullGdpImpactPct)} of base GDP</span>
        </div>

        <div className={styles.grid}>
          <StatTile
            label="Fiscal Deficit Impact"
            value={formatCr(analysis.deficitImpact)}
            trendDirection={analysis.deficitImpact > 0 ? 'down' : analysis.deficitImpact < 0 ? 'up' : 'flat'}
          />
          <StatTile
            label="Fiscal Deficit as % of GDP"
            value={formatPct(analysis.deficitPctOfGdp)}
            trendDirection={analysis.deficitPctOfGdp > 0 ? 'down' : analysis.deficitPctOfGdp < 0 ? 'up' : 'flat'}
          />
          <StatTile
            label="Net Fiscal Impulse"
            value={formatCr(analysis.netFiscalImpulse)}
            trendDirection={analysis.netFiscalImpulse >= 0 ? 'up' : 'down'}
          />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>GDP Path Over 3 Years</h2>
          <LineChart
            ariaLabel="GDP path with and without fiscal policy"
            xLabels={['Year 1', 'Year 2', 'Year 3']}
            yFormat={(v) => `₹${v.toFixed(0)}`}
            series={[
              { id: 'baseline', label: 'Baseline GDP', color: '#94a3b8', values: analysis.baselinePath },
              { id: 'policy', label: 'With Policy', color: '#3b82f6', values: analysis.gdpPath },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
