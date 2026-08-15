/**
 * EMPLOYMENT DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. Values are
 * shaped to resemble typical India unemployment-rate ranges (roughly 6-9%,
 * with urban usually running above rural, and labour force participation
 * notably below the global average) but are hand-authored for this UI
 * preview, not pulled from PLFS/CMIE or any live data provider.
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

/** Monthly overall unemployment rate %, one value per entry in MONTHS. */
export const UNEMPLOYMENT_OVERALL = [
  7.9, 8.1, 7.8, 7.5, 7.2, 7.0, 6.8, 6.9, 7.1, 7.3, 7.5, 7.8, 7.6, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2,
  6.5, 6.8, 7.0, 7.2, 6.9,
]

/** Monthly urban unemployment rate %, one value per entry in MONTHS. */
export const UNEMPLOYMENT_URBAN = [
  9.0, 9.3, 9.0, 8.7, 8.4, 8.1, 7.9, 8.0, 8.2, 8.5, 8.7, 9.0, 8.8, 8.5, 8.2, 7.9, 7.7, 7.5, 7.3,
  7.6, 7.9, 8.1, 8.3, 8.0,
]

/** Monthly rural unemployment rate %, one value per entry in MONTHS. */
export const UNEMPLOYMENT_RURAL = [
  7.2, 7.4, 7.1, 6.8, 6.5, 6.3, 6.1, 6.2, 6.4, 6.6, 6.8, 7.1, 6.9, 6.6, 6.3, 6.1, 5.9, 5.7, 5.5,
  5.8, 6.1, 6.3, 6.5, 6.2,
]

/** Trailing 6-month labour force participation rate % (sparkline only). */
export const LFPR_TREND_6M = [40.8, 40.6, 40.3, 40.1, 40.3, 40.5]

/** Sector employment split for the latest month — share of total workforce. */
export const SECTOR_EMPLOYMENT = [
  { label: 'Agriculture', share: 42, color: '#10b981' },
  { label: 'Industry', share: 25, color: '#f59e0b' },
  { label: 'Services', share: 33, color: '#3b82f6' },
]
