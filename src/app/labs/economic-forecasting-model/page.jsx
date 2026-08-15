'use client'

import { useMemo, useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { SegmentedControl, SliderField } from '@/components/features/labs/LabInputGroup'
import LineChart from '@/components/features/labs/charts/LineChart'
import { linearRegression } from '@/lib/finance'
import { LABS_TOOLS } from '../data'
import { INDICATORS, SERIES, YEARS } from './data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'economic-forecasting-model')

function formatValue(value, unit) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}${unit}`
}

export default function EconomicForecastingModelPage() {
  const [indicatorId, setIndicatorId] = useState('gdp')
  const [horizon, setHorizon] = useState(3)

  const indicator = INDICATORS.find((i) => i.id === indicatorId)
  const history = SERIES[indicatorId]

  const model = useMemo(() => {
    const xs = history.map((_, i) => i)
    const { slope, intercept, r2 } = linearRegression(xs, history)

    const fitted = xs.map((x) => slope * x + intercept)
    const residuals = history.map((actual, i) => actual - fitted[i])
    const residualStd = Math.sqrt(
      residuals.reduce((sum, r) => sum + r * r, 0) / residuals.length
    )

    const forecastYears = Array.from({ length: horizon }, (_, i) => YEARS[YEARS.length - 1] + i + 1)
    const forecastValues = forecastYears.map((_, i) => slope * (history.length + i) + intercept)

    const mainSeries = [...history, ...forecastValues]
    const upperSeries = [
      ...history,
      ...forecastValues.map((v, i) => v + residualStd * 1.28 * Math.sqrt(i + 1)),
    ]
    const lowerSeries = [
      ...history,
      ...forecastValues.map((v, i) => v - residualStd * 1.28 * Math.sqrt(i + 1)),
    ]

    return {
      slope,
      r2,
      residualStd,
      forecastYears,
      forecastValues,
      mainSeries,
      upperSeries,
      lowerSeries,
    }
  }, [history, horizon])

  const xLabels = [...YEARS.map(String), ...model.forecastYears.map(String)]
  const latestActual = history[history.length - 1]
  const finalForecast = model.forecastValues[model.forecastValues.length - 1]

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <SegmentedControl
          label="Indicator"
          options={INDICATORS.map((i) => i.label)}
          value={indicator.label}
          onChange={(label) => setIndicatorId(INDICATORS.find((i) => i.label === label).id)}
        />

        <SliderField
          label="Years to forecast"
          value={horizon}
          onChange={setHorizon}
          min={1}
          max={5}
          step={1}
          unit=" yrs"
        />

        <p className={styles.note}>
          Fits an ordinary least squares linear trend to the historical {indicator.label} series
          (2014–2025, illustrative approximations of real India history — not a live feed) and
          extrapolates it forward. The shaded range widens with distance from the last known year,
          computed from the regression&apos;s residual error — not an official RBI/government
          forecast.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Latest Actual ({YEARS[YEARS.length - 1]})</span>
            <span className={styles.statValue}>{formatValue(latestActual, indicator.unit)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>
              Forecast ({model.forecastYears[model.forecastYears.length - 1]})
            </span>
            <span className={styles.statValue}>{formatValue(finalForecast, indicator.unit)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Trend Slope (per year)</span>
            <span className={styles.statValue}>{formatValue(model.slope, indicator.unit)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Trend Fit (R²)</span>
            <span className={styles.statValue}>{model.r2.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>{indicator.label} — History &amp; Forecast</h2>
          <LineChart
            ariaLabel={`${indicator.label} historical series and linear trend forecast`}
            xLabels={xLabels}
            yFormat={(v) => `${v.toFixed(1)}${indicator.unit}`}
            series={[
              { id: 'upper', label: 'Upper Range', color: '#94a3b8', values: model.upperSeries },
              {
                id: 'main',
                label: 'Actual + Forecast',
                color: indicator.color,
                values: model.mainSeries,
              },
              { id: 'lower', label: 'Lower Range', color: '#94a3b8', values: model.lowerSeries },
            ]}
          />
        </div>

        <p className={styles.note}>
          A low R² means the historical series is noisy relative to a straight-line trend (as is
          typical for GDP growth around shocks like 2020) — treat the forecast as directional, not
          precise.
        </p>
      </div>
    </LabToolLayout>
  )
}
