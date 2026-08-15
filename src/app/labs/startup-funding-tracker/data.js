/**
 * STARTUP FUNDING TRACKER — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. All startup
 * names below are entirely FICTIONAL sample entities invented for this UI
 * preview (not real Indian startups). Amounts (₹ crore) are illustrative,
 * loosely shaped to typical seed/Series A/B/C round sizes. Connect a real
 * data provider (e.g. a funding-tracking API) to make this live.
 */

export const SECTORS = ['Fintech', 'E-commerce', 'SaaS', 'HealthTech', 'EdTech', 'Logistics', 'AgriTech']

export const STAGES = ['Seed', 'Series A', 'Series B', 'Series C']

export const FUNDING_ROUNDS = [
  { name: 'Paywise', sector: 'Fintech', stage: 'Seed', amountCr: 4.5, month: 'Sep 2025' },
  { name: 'LedgerLoop', sector: 'Fintech', stage: 'Series A', amountCr: 28, month: 'Oct 2025' },
  { name: 'CoinTrail', sector: 'Fintech', stage: 'Series B', amountCr: 82, month: 'Jan 2026' },
  { name: 'VaultBridge', sector: 'Fintech', stage: 'Series C', amountCr: 240, month: 'Mar 2026' },
  { name: 'BasketHive', sector: 'E-commerce', stage: 'Seed', amountCr: 3.2, month: 'Aug 2025' },
  { name: 'Cartwell', sector: 'E-commerce', stage: 'Series A', amountCr: 22, month: 'Nov 2025' },
  { name: 'ShelfSpring', sector: 'E-commerce', stage: 'Series B', amountCr: 95, month: 'Feb 2026' },
  { name: 'Marketloop', sector: 'E-commerce', stage: 'Series C', amountCr: 310, month: 'Jun 2026' },
  { name: 'Stackframe', sector: 'SaaS', stage: 'Seed', amountCr: 6.8, month: 'Jul 2025' },
  { name: 'Flowbench', sector: 'SaaS', stage: 'Series A', amountCr: 34, month: 'Dec 2025' },
  { name: 'Nodewell', sector: 'SaaS', stage: 'Series B', amountCr: 110, month: 'Apr 2026' },
  { name: 'Gridloom', sector: 'SaaS', stage: 'Series C', amountCr: 180, month: 'Jul 2026' },
  { name: 'Vitalpath', sector: 'HealthTech', stage: 'Seed', amountCr: 2.5, month: 'Sep 2025' },
  { name: 'Caregrid', sector: 'HealthTech', stage: 'Series A', amountCr: 18, month: 'Jan 2026' },
  { name: 'Pulsewell', sector: 'HealthTech', stage: 'Series B', amountCr: 70, month: 'May 2026' },
  { name: 'Remedyframe', sector: 'HealthTech', stage: 'Series C', amountCr: 200, month: 'Aug 2026' },
  { name: 'Learnloop', sector: 'EdTech', stage: 'Seed', amountCr: 1.8, month: 'Jun 2025' },
  { name: 'Classbridge', sector: 'EdTech', stage: 'Series A', amountCr: 16, month: 'Oct 2025' },
  { name: 'Skillhive', sector: 'EdTech', stage: 'Series B', amountCr: 58, month: 'Mar 2026' },
  { name: 'Coursewell', sector: 'EdTech', stage: 'Series C', amountCr: 155, month: 'Jul 2026' },
  { name: 'Routewise', sector: 'Logistics', stage: 'Seed', amountCr: 5.1, month: 'Aug 2025' },
  { name: 'Cargoloop', sector: 'Logistics', stage: 'Series A', amountCr: 30, month: 'Feb 2026' },
  { name: 'Freightbridge', sector: 'Logistics', stage: 'Series B', amountCr: 88, month: 'Jun 2026' },
  { name: 'Fieldgrove', sector: 'AgriTech', stage: 'Seed', amountCr: 3.6, month: 'Nov 2025' },
]
