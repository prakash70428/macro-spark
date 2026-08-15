/**
 * COMPANY FINANCIAL DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. The four
 * companies below are entirely FICTIONAL sample entities invented for this
 * UI preview (not real Indian companies) with plausible-looking growth
 * trajectories per sector. CAGR, total return, and net margin are computed
 * live from the revenue/profit series via src/lib/finance.js — nothing here
 * is a real financial statement.
 */

export const YEARS = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26']

export const COMPANIES = [
  {
    id: 'clearwater-analytics',
    name: 'Clearwater Analytics',
    sector: 'IT Services',
    color: '#3b82f6',
    // Steady ~12%/yr revenue growth, healthy ~18% net margin.
    revenue: [3200, 3580, 4010, 4495, 5035],
    netProfit: [576, 644, 722, 809, 906],
  },
  {
    id: 'nimbus-retail',
    name: 'Nimbus Retail',
    sector: 'Retail',
    color: '#f59e0b',
    // Fast ~18%/yr revenue growth, thin ~4.5% net margin typical of retail.
    revenue: [2100, 2480, 2925, 3450, 4070],
    netProfit: [95, 112, 132, 155, 183],
  },
  {
    id: 'meridian-trust-bank',
    name: 'Meridian Trust Bank',
    sector: 'Banking',
    color: '#8b5cf6',
    // Moderate revenue growth, but profit swings with provisioning cycles.
    revenue: [5200, 5720, 6292, 6921, 7613],
    netProfit: [1100, 850, 1450, 1200, 1900],
  },
  {
    id: 'orbital-industries',
    name: 'Orbital Industries',
    sector: 'Manufacturing',
    color: '#10b981',
    // Modest ~6%/yr revenue growth, stable ~8% net margin.
    revenue: [4100, 4345, 4605, 4880, 5175],
    netProfit: [328, 347, 368, 390, 414],
  },
]
