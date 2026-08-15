/**
 * GDP DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. The quarterly
 * path (pre-COVID slowdown, the FY21 COVID contraction, the FY22 base-effect
 * rebound, and normalization to a 4-8% band from FY23 onward) is shaped to
 * resemble India's well-documented historical real GDP growth trend, but this
 * is a hand-authored illustrative series for this UI preview, not pulled from
 * MoSPI/NSO or any live data provider.
 */

export const QUARTERS = [
  'Q1 FY20',
  'Q2 FY20',
  'Q3 FY20',
  'Q4 FY20',
  'Q1 FY21',
  'Q2 FY21',
  'Q3 FY21',
  'Q4 FY21',
  'Q1 FY22',
  'Q2 FY22',
  'Q3 FY22',
  'Q4 FY22',
  'Q1 FY23',
  'Q2 FY23',
  'Q3 FY23',
  'Q4 FY23',
  'Q1 FY24',
  'Q2 FY24',
  'Q3 FY24',
  'Q4 FY24',
]

/** Quarterly real GDP growth YoY %, one value per entry in QUARTERS. */
export const GDP_GROWTH = [
  5.4, 4.6, 3.3, 3.1, -23.9, -7.4, 0.5, 1.6, 20.1, 8.4, 5.4, 4.0, 13.1, 6.2, 4.5, 6.1, 7.8, 8.1,
  8.4, 7.8,
]

/** Sector breakdown for the latest quarter (Q4 FY24) — share of GVA and YoY growth. */
export const SECTOR_BREAKDOWN = [
  { label: 'Agriculture', share: 18, growth: 3.5, color: '#10b981' },
  { label: 'Industry', share: 28, growth: 5.2, color: '#f59e0b' },
  { label: 'Services', share: 54, growth: 7.1, color: '#3b82f6' },
]
