/**
 * ECONOMIC FORECASTING MODEL — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static annual series (2014–2025), illustrative approximations of real
 * historical India GDP growth and CPI inflation trends. Not a live feed.
 *
 * The forecast shown on the page is computed at runtime via linear regression
 * over this series (src/lib/finance.js's linearRegression), not a hardcoded
 * projection.
 */

export const INDICATORS = [
  { id: 'gdp', label: 'GDP Growth (%)', color: '#8b5cf6', unit: '%' },
  { id: 'cpi', label: 'CPI Inflation (%)', color: '#f59e0b', unit: '%' },
]

export const YEARS = [
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
]

export const SERIES = {
  gdp: [7.4, 8.0, 8.3, 6.8, 6.5, 3.9, -5.8, 9.1, 7.0, 8.2, 6.5, 6.8],
  cpi: [6.7, 4.9, 4.5, 3.6, 3.4, 4.8, 6.2, 5.5, 6.7, 5.4, 4.8, 4.2],
}
