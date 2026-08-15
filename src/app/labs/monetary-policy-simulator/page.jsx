'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'monetary-policy-simulator')

const LENDING_SPREAD = 2.5 // base lending rate = repo + 2.5 (illustrative baseline of 9.0% at 6.5% repo)
const PASSTHROUGH = 0.8 // repo change -> lending rate passthrough
const GDP_SENSITIVITY = -0.3 // pts of GDP growth per 1pt repo change
const INFLATION_SENSITIVITY = -0.5 // pts of inflation per 1pt repo change
const LAG_CURVE = [0.2, 0.5, 0.8, 1.0] // Q1-Q4 transmission lag

function formatPct(value, digits = 2) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export default function MonetaryPolicySimulatorPage() {
  const [repoRate, setRepoRate] = useState('6.5')
  const [deltaRepo, setDeltaRepo] = useState(0.5)

  const analysis = useMemo(() => {
    const currentRepo = Number(repoRate) || 0
    const baseLendingRate = currentRepo + LENDING_SPREAD
    const newLendingRate = baseLendingRate + deltaRepo * PASSTHROUGH
    const newRepoRate = currentRepo + deltaRepo
    const fullGdpImpact = deltaRepo * GDP_SENSITIVITY
    const fullInflationImpact = deltaRepo * INFLATION_SENSITIVITY

    const gdpPath = LAG_CURVE.map((l) => fullGdpImpact * l)
    const inflationPath = LAG_CURVE.map((l) => fullInflationImpact * l)

    return {
      baseLendingRate,
      newLendingRate,
      newRepoRate,
      fullGdpImpact,
      fullInflationImpact,
      gdpPath,
      inflationPath,
    }
  }, [repoRate, deltaRepo])

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField
          label="Current repo rate"
          value={repoRate}
          onChange={setRepoRate}
          unit="%"
          step={0.25}
        />
        <SliderField
          label="Change in repo rate"
          value={deltaRepo}
          onChange={setDeltaRepo}
          min={-2}
          max={2}
          step={0.25}
          unit=" pts"
        />

        <p className={styles.note}>
          This is a simplified educational model using illustrative elasticities/multipliers, not
          an official RBI/government forecasting model — figures are computed live from your
          inputs but should not be used for real policy decisions. It assumes a baseline lending
          rate of repo + 2.5 pts, an 0.8x lending-rate passthrough, a −0.3 pt GDP growth impact and
          a −0.5 pt inflation impact per 1 pt of repo change, phased in over four quarters (20% /
          50% / 80% / 100%) to represent monetary policy transmission lag.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.heroCard}>
          <span className={styles.heroLabel}>Projected Lending Rate</span>
          <span className={styles.heroValue}>{analysis.newLendingRate.toFixed(2)}%</span>
        </div>

        <div className={styles.grid}>
          <StatTile
            label="GDP Growth Impact (full effect)"
            value={`${formatPct(analysis.fullGdpImpact)} pts`}
            trendDirection={analysis.fullGdpImpact >= 0 ? 'up' : 'down'}
          />
          <StatTile
            label="Inflation Impact (full effect)"
            value={`${formatPct(analysis.fullInflationImpact)} pts`}
            trendDirection={analysis.fullInflationImpact >= 0 ? 'up' : 'down'}
          />
          <StatTile label="New Repo Rate" value={`${analysis.newRepoRate.toFixed(2)}%`} />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Transmission Over 4 Quarters</h2>
          <LineChart
            ariaLabel="GDP growth and inflation impact ramping in over four quarters"
            xLabels={['Q1', 'Q2', 'Q3', 'Q4']}
            yFormat={(v) => `${v.toFixed(2)}%`}
            series={[
              { id: 'gdp', label: 'GDP Growth Impact', color: '#3b82f6', values: analysis.gdpPath },
              {
                id: 'inflation',
                label: 'Inflation Impact',
                color: '#f59e0b',
                values: analysis.inflationPath,
              },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
