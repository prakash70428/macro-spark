/**
 * PORTFOLIO BACKTESTING TOOL — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static annual return series (2010–2025), compiled from public index-provider
 * performance summaries as of Aug 2026. Not a live feed.
 *
 * - "Broad Index" tracks S&P 500 total return (with dividends reinvested).
 * - "Growth" / "Value" track S&P 500 Growth and S&P 500 Value index annual
 *   performance (compiled approximations from public S&P Dow Jones Indices
 *   summaries).
 * - "Momentum" is a constructed illustrative factor-strategy proxy — no single
 *   canonical public index return series was used — calibrated to reflect the
 *   well-documented behavior of momentum strategies (higher beta to prevailing
 *   trend, sharp reversals in rotation years like 2016 and 2022).
 *
 * All CAGR / Sharpe / max-drawdown / total-return figures shown on the page are
 * computed at runtime from these annual returns via src/lib/finance.js.
 */

export const STRATEGIES = [
  {
    id: 'index',
    label: 'Broad Index (S&P 500)',
    color: '#3b82f6',
    description: 'Passive exposure to the S&P 500, dividends reinvested.',
  },
  {
    id: 'momentum',
    label: 'Momentum',
    color: '#f59e0b',
    description: 'Tilts toward stocks with the strongest recent price trend.',
  },
  {
    id: 'value',
    label: 'Value',
    color: '#10b981',
    description: 'Tilts toward stocks trading cheap relative to fundamentals.',
  },
  {
    id: 'growth',
    label: 'Growth',
    color: '#8b5cf6',
    description: 'Tilts toward stocks with the highest earnings/revenue growth.',
  },
]

/** Calendar year -> decimal annual return, one series per strategy id. */
export const ANNUAL_RETURNS = {
  index: {
    2010: 0.1506,
    2011: 0.0211,
    2012: 0.16,
    2013: 0.3239,
    2014: 0.1369,
    2015: -0.0073,
    2016: 0.0954,
    2017: 0.1942,
    2018: -0.0624,
    2019: 0.2888,
    2020: 0.1626,
    2021: 0.2689,
    2022: -0.1944,
    2023: 0.2423,
    2024: 0.2331,
    2025: 0.179,
  },
  momentum: {
    2010: 0.16,
    2011: -0.01,
    2012: 0.08,
    2013: 0.35,
    2014: 0.16,
    2015: 0.03,
    2016: -0.12,
    2017: 0.24,
    2018: -0.01,
    2019: 0.22,
    2020: 0.2,
    2021: 0.08,
    2022: -0.12,
    2023: 0.15,
    2024: 0.28,
    2025: 0.19,
  },
  value: {
    2010: 0.151,
    2011: -0.005,
    2012: 0.177,
    2013: 0.318,
    2014: 0.124,
    2015: -0.031,
    2016: 0.174,
    2017: 0.154,
    2018: -0.083,
    2019: 0.259,
    2020: 0.014,
    2021: 0.249,
    2022: -0.052,
    2023: 0.115,
    2024: 0.129,
    2025: 0.135,
  },
  growth: {
    2010: 0.151,
    2011: 0.047,
    2012: 0.146,
    2013: 0.328,
    2014: 0.149,
    2015: 0.055,
    2016: 0.069,
    2017: 0.274,
    2018: -0.009,
    2019: 0.311,
    2020: 0.335,
    2021: 0.32,
    2022: -0.294,
    2023: 0.3,
    2024: 0.334,
    2025: 0.21,
  },
}

export const YEARS = Object.keys(ANNUAL_RETURNS.index)
  .map(Number)
  .sort((a, b) => a - b)
