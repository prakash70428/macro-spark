/**
 * RISK ANALYTICS DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static annual return series (2016–2025), illustrative approximations of
 * real historical behavior for a benchmark index and a handful of large-cap /
 * small-cap proxies. Not a live feed.
 *
 * Beta, Sharpe, Sortino, Max Drawdown, and Volatility shown on the page are
 * computed at runtime from these return series via src/lib/finance.js and the
 * local helpers in page.jsx — not hardcoded figures.
 */

export const BENCHMARK_ID = 'nifty50'

export const TICKERS = [
  { id: 'nifty50', label: 'Nifty 50 (Benchmark)', color: '#64748b' },
  { id: 'reliance', label: 'Reliance Industries', color: '#3b82f6' },
  { id: 'tcs', label: 'TCS', color: '#8b5cf6' },
  { id: 'hdfcbank', label: 'HDFC Bank', color: '#10b981' },
  { id: 'smallcap100', label: 'Nifty Smallcap 100', color: '#ef4444' },
]

/** Calendar year -> decimal annual return, one series per ticker id. */
export const ANNUAL_RETURNS = {
  nifty50: {
    2016: 0.03,
    2017: 0.286,
    2018: 0.031,
    2019: 0.12,
    2020: 0.149,
    2021: 0.241,
    2022: 0.043,
    2023: 0.2,
    2024: 0.088,
    2025: 0.125,
  },
  reliance: {
    2016: 0.06,
    2017: 0.22,
    2018: 0.121,
    2019: 0.363,
    2020: 0.086,
    2021: 0.211,
    2022: -0.084,
    2023: 0.052,
    2024: 0.263,
    2025: 0.09,
  },
  tcs: {
    2016: -0.05,
    2017: 0.087,
    2018: 0.259,
    2019: 0.028,
    2020: 0.416,
    2021: 0.147,
    2022: -0.084,
    2023: 0.152,
    2024: 0.15,
    2025: 0.07,
  },
  hdfcbank: {
    2016: 0.09,
    2017: 0.34,
    2018: 0.19,
    2019: 0.11,
    2020: -0.08,
    2021: 0.13,
    2022: 0.1,
    2023: -0.02,
    2024: 0.04,
    2025: 0.16,
  },
  smallcap100: {
    2016: 0.02,
    2017: 0.573,
    2018: -0.29,
    2019: -0.073,
    2020: 0.213,
    2021: 0.594,
    2022: -0.055,
    2023: 0.556,
    2024: 0.24,
    2025: -0.05,
  },
}

export const YEARS = Object.keys(ANNUAL_RETURNS[BENCHMARK_ID])
  .map(Number)
  .sort((a, b) => a - b)
