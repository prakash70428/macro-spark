/**
 * INFLATION DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. Values are
 * shaped to resemble typical India CPI/WPI ranges (CPI roughly 3-7% YoY,
 * WPI roughly -2% to 3% YoY) but are hand-authored for this UI preview, not
 * pulled from MoSPI or any live data provider.
 */

export const MONTHS = [
  'Sep 24',
  'Oct 24',
  'Nov 24',
  'Dec 24',
  'Jan 25',
  'Feb 25',
  'Mar 25',
  'Apr 25',
  'May 25',
  'Jun 25',
  'Jul 25',
  'Aug 25',
  'Sep 25',
  'Oct 25',
  'Nov 25',
  'Dec 25',
  'Jan 26',
  'Feb 26',
  'Mar 26',
  'Apr 26',
  'May 26',
  'Jun 26',
  'Jul 26',
  'Aug 26',
]

/** Monthly CPI (Consumer Price Index) YoY %, one value per entry in MONTHS. */
export const CPI = [
  5.5, 5.8, 5.6, 5.2, 4.9, 4.6, 4.3, 4.1, 4.4, 4.7, 5.0, 5.3, 5.1, 4.8, 4.5, 4.2, 3.9, 3.7, 3.5,
  3.8, 4.0, 4.3, 4.5, 4.2,
]

/** Monthly WPI (Wholesale Price Index) YoY %, one value per entry in MONTHS. */
export const WPI = [
  0.3, 0.8, 1.2, 1.5, 1.8, 2.1, 2.4, 2.0, 1.6, 1.2, 0.8, 0.4, 0.0, -0.4, -0.8, -1.2, -0.9, -0.5,
  -0.1, 0.3, 0.7, 1.1, 1.4, 1.0,
]

/** Trailing 6-month trend for latest-month Food and Core inflation (sparklines). */
export const FOOD_TREND_6M = [6.5, 7.0, 7.6, 7.9, 8.0, 8.2]
export const CORE_TREND_6M = [3.2, 3.3, 3.5, 3.6, 3.7, 3.8]

/** Category breakdown for the latest month (Aug 26) — CPI sub-index YoY %. */
export const CATEGORY_BREAKDOWN = [
  { label: 'Food', value: 8.2, color: '#f59e0b' },
  { label: 'Fuel', value: 4.1, color: '#ef4444' },
  { label: 'Housing', value: 3.2, color: '#3b82f6' },
  { label: 'Core (ex food & fuel)', value: 3.8, color: '#8b5cf6' },
]
