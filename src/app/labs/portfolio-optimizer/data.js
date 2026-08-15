/**
 * PORTFOLIO OPTIMIZER — CAPITAL MARKET ASSUMPTIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * A fixed 4-asset-class universe with assumed long-run annual expected return,
 * volatility, and pairwise correlation. These are illustrative capital market
 * assumptions (broadly in line with long-run Indian asset-class behavior), not
 * live or forecasted figures for any specific security.
 *
 * The optimizer runs a real mean-variance (Markowitz) grid search over this
 * universe at runtime — see page.jsx.
 */

export const ASSET_CLASSES = [
  { id: 'equity', label: 'Equity', color: '#8b5cf6', expectedReturn: 0.13, volatility: 0.18 },
  { id: 'bonds', label: 'Bonds', color: '#3b82f6', expectedReturn: 0.07, volatility: 0.04 },
  { id: 'gold', label: 'Gold', color: '#f59e0b', expectedReturn: 0.09, volatility: 0.15 },
  { id: 'cash', label: 'Cash', color: '#10b981', expectedReturn: 0.05, volatility: 0.01 },
]

/** Pairwise correlation assumptions between asset classes. */
export const CORRELATIONS = {
  'equity-bonds': -0.1,
  'equity-gold': 0.05,
  'equity-cash': 0,
  'bonds-gold': 0.1,
  'bonds-cash': 0.2,
  'gold-cash': 0,
}

export function correlationBetween(idA, idB) {
  if (idA === idB) return 1
  const key1 = `${idA}-${idB}`
  const key2 = `${idB}-${idA}`
  return CORRELATIONS[key1] ?? CORRELATIONS[key2] ?? 0
}

/** Max annualized volatility allowed for each risk tolerance tier. */
export const MAX_VOLATILITY_BY_RISK = {
  Low: 0.07,
  Medium: 0.13,
  High: 0.22,
}

export const RISK_FREE_RATE = 0.06
