'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import {
  SegmentedControl,
  SliderField,
  NumberField,
} from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'monte-carlo-simulator')

const SIMULATION_OPTIONS = ['200', '500', '1000']

function randomNormal() {
  // Box-Muller transform for a standard normal draw.
  const u1 = Math.random() || 1e-12
  const u2 = Math.random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function runSimulation({ initial, meanReturnPct, volPct, years, numSims }) {
  const meanReturn = meanReturnPct / 100
  const vol = volPct / 100

  const paths = []
  for (let s = 0; s < numSims; s++) {
    let value = initial
    const path = [value]
    for (let y = 1; y <= years; y++) {
      const Z = randomNormal()
      value = value * Math.exp(meanReturn - 0.5 * vol * vol + vol * Z)
      path.push(value)
    }
    paths.push(path)
  }

  const p10 = []
  const p50 = []
  const p90 = []
  for (let y = 0; y <= years; y++) {
    const valuesAtYear = paths.map((p) => p[y]).sort((a, b) => a - b)
    const pick = (pct) =>
      valuesAtYear[Math.min(valuesAtYear.length - 1, Math.floor(pct * valuesAtYear.length))]
    p10.push(pick(0.1))
    p50.push(pick(0.5))
    p90.push(pick(0.9))
  }

  const finalValues = paths.map((p) => p[years])
  const lossCount = finalValues.filter((v) => v < initial).length

  return {
    p10,
    p50,
    p90,
    median: p50[years],
    best: p90[years],
    worst: p10[years],
    probLoss: (lossCount / numSims) * 100,
  }
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export default function MonteCarloSimulatorPage() {
  const [initial, setInitial] = useState('100000')
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [volatility, setVolatility] = useState(18)
  const [years, setYears] = useState(15)
  const [numSims, setNumSims] = useState('500')
  const [status, setStatus] = useState('idle') // idle | running | done
  const [result, setResult] = useState(null)

  function markDirty() {
    setStatus('idle')
  }

  function handleRun() {
    setStatus('running')
    setTimeout(() => {
      const simResult = runSimulation({
        initial: Number(initial) || 0,
        meanReturnPct: expectedReturn,
        volPct: volatility,
        years,
        numSims: Number(numSims),
      })
      setResult(simResult)
      setStatus('done')
    }, 400)
  }

  const xLabels = result ? result.p50.map((_, i) => String(i)) : []

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <NumberField
          label="Initial investment"
          value={initial}
          onChange={(v) => {
            setInitial(v)
            markDirty()
          }}
          unit="₹"
          min={0}
        />

        <SliderField
          label="Expected annual return"
          value={expectedReturn}
          onChange={(v) => {
            setExpectedReturn(v)
            markDirty()
          }}
          min={-5}
          max={25}
          step={0.5}
          unit="%"
        />
        <SliderField
          label="Annual volatility"
          value={volatility}
          onChange={(v) => {
            setVolatility(v)
            markDirty()
          }}
          min={1}
          max={60}
          step={1}
          unit="%"
        />
        <SliderField
          label="Years"
          value={years}
          onChange={(v) => {
            setYears(v)
            markDirty()
          }}
          min={1}
          max={30}
          step={1}
          unit=" yrs"
        />

        <SegmentedControl
          label="Number of simulations"
          options={SIMULATION_OPTIONS}
          value={numSims}
          onChange={(v) => {
            setNumSims(v)
            markDirty()
          }}
        />

        <div className={styles.actions}>
          <Button variant="primary" loading={status === 'running'} onClick={handleRun}>
            Run Simulation
          </Button>
        </div>

        <p className={styles.note}>
          Figures are computed live from the inputs above using a geometric Brownian motion Monte
          Carlo simulation — for illustration, not financial advice.
        </p>
      </div>

      {status === 'done' && result && (
        <div className={styles.results}>
          <div className={styles.heroCard}>
            <span className={styles.heroLabel}>Median Outcome</span>
            <span className={styles.heroValue}>{formatCurrency(result.median)}</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Best Case (P90)</span>
              <span className={styles.statValue}>{formatCurrency(result.best)}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Worst Case (P10)</span>
              <span className={styles.statValue}>{formatCurrency(result.worst)}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Probability of Loss</span>
              <span className={styles.statValue}>{result.probLoss.toFixed(1)}%</span>
            </div>
          </div>

          <div className={styles.chartCard}>
            <h2 className={styles.resultTitle}>Simulated Portfolio Value Range</h2>
            <LineChart
              ariaLabel="10th, 50th, and 90th percentile simulated portfolio value by year"
              xLabels={xLabels}
              yFormat={(v) => formatCurrency(v)}
              series={[
                { id: 'p90', label: 'P90 (Best Case)', color: '#10b981', values: result.p90 },
                { id: 'p50', label: 'P50 (Median)', color: '#8b5cf6', values: result.p50 },
                { id: 'p10', label: 'P10 (Worst Case)', color: '#ef4444', values: result.p10 },
              ]}
            />
          </div>
        </div>
      )}
    </LabToolLayout>
  )
}
