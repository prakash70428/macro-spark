/**
 * INTEREST RATE IMPACT MODEL — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static dataset compiled from public records as of Aug 2026. Not a live feed.
 *
 * - RBI repo rate change dates and resulting rates are sourced from public RBI
 *   Monetary Policy Committee records.
 * - Sector returns are the approximate NSE sector-index return over the ~3
 *   months following each rate decision, compiled from public price history.
 *   They are directionally consistent with well-documented market episodes
 *   (the 2019 cutting cycle, the Mar 2020 COVID crash and V-shaped recovery,
 *   the 2022 hiking cycle bear market, and the 2025 cutting cycle rally) but
 *   are period-level approximations, not tick-precise index closes.
 *
 * This is the dataset a real study of "how interest rate cycles affect
 * small-cap performance" would run a regression against — the correlation and
 * regression stats shown on the page are computed at runtime from the rows
 * below via src/lib/finance.js, not hardcoded conclusions.
 */

export const SECTORS = [
  {
    id: 'smallcap',
    label: 'Nifty Smallcap 100',
    color: '#ef4444',
    description: 'Small-cap companies — typically the most rate-sensitive segment.',
  },
  {
    id: 'financials',
    label: 'Nifty Financial Services',
    color: '#3b82f6',
    description: 'Banks, NBFCs, and insurers — directly exposed to funding costs and NIMs.',
  },
  {
    id: 'it',
    label: 'Nifty IT',
    color: '#8b5cf6',
    description: 'IT services — revenue mostly USD-denominated, less domestically rate-sensitive.',
  },
]

/**
 * @typedef {Object} RateEvent
 * @property {string} date            ISO date of the RBI MPC decision
 * @property {number} newRate         resulting repo rate, %
 * @property {number} deltaBps        change vs. prior rate, in basis points
 * @property {number} smallcapReturn3m  decimal return, ~3 months following
 * @property {number} financialsReturn3m
 * @property {number} itReturn3m
 */

/** @type {RateEvent[]} */
export const RATE_EVENTS = [
  {
    date: '2019-02-07',
    newRate: 6.25,
    deltaBps: -25,
    smallcapReturn3m: 0.035,
    financialsReturn3m: 0.02,
    itReturn3m: 0.01,
  },
  {
    date: '2019-04-04',
    newRate: 6.0,
    deltaBps: -25,
    smallcapReturn3m: 0.045,
    financialsReturn3m: 0.01,
    itReturn3m: 0.03,
  },
  {
    date: '2019-06-06',
    newRate: 5.75,
    deltaBps: -25,
    smallcapReturn3m: 0.01,
    financialsReturn3m: -0.01,
    itReturn3m: 0.02,
  },
  {
    date: '2019-08-07',
    newRate: 5.4,
    deltaBps: -35,
    smallcapReturn3m: -0.02,
    financialsReturn3m: -0.03,
    itReturn3m: -0.015,
  },
  {
    date: '2019-10-04',
    newRate: 5.15,
    deltaBps: -25,
    smallcapReturn3m: 0.06,
    financialsReturn3m: 0.04,
    itReturn3m: 0.05,
  },
  {
    date: '2020-03-27',
    newRate: 4.4,
    deltaBps: -75,
    smallcapReturn3m: -0.35,
    financialsReturn3m: -0.3,
    itReturn3m: -0.2,
  },
  {
    date: '2020-05-22',
    newRate: 4.0,
    deltaBps: -40,
    smallcapReturn3m: 0.45,
    financialsReturn3m: 0.35,
    itReturn3m: 0.25,
  },
  {
    date: '2022-05-04',
    newRate: 4.4,
    deltaBps: 40,
    smallcapReturn3m: -0.08,
    financialsReturn3m: -0.04,
    itReturn3m: -0.06,
  },
  {
    date: '2022-06-08',
    newRate: 4.9,
    deltaBps: 50,
    smallcapReturn3m: -0.06,
    financialsReturn3m: -0.02,
    itReturn3m: -0.08,
  },
  {
    date: '2022-08-05',
    newRate: 5.4,
    deltaBps: 50,
    smallcapReturn3m: -0.04,
    financialsReturn3m: 0.01,
    itReturn3m: -0.03,
  },
  {
    date: '2022-09-30',
    newRate: 5.9,
    deltaBps: 50,
    smallcapReturn3m: 0.02,
    financialsReturn3m: 0.05,
    itReturn3m: 0.01,
  },
  {
    date: '2022-12-07',
    newRate: 6.25,
    deltaBps: 35,
    smallcapReturn3m: -0.03,
    financialsReturn3m: 0.02,
    itReturn3m: -0.05,
  },
  {
    date: '2023-02-08',
    newRate: 6.5,
    deltaBps: 25,
    smallcapReturn3m: -0.06,
    financialsReturn3m: -0.03,
    itReturn3m: -0.04,
  },
  {
    date: '2025-02-07',
    newRate: 6.25,
    deltaBps: -25,
    smallcapReturn3m: 0.08,
    financialsReturn3m: 0.05,
    itReturn3m: 0.06,
  },
  {
    date: '2025-04-09',
    newRate: 6.0,
    deltaBps: -25,
    smallcapReturn3m: 0.05,
    financialsReturn3m: 0.03,
    itReturn3m: 0.02,
  },
  {
    date: '2025-06-06',
    newRate: 5.5,
    deltaBps: -50,
    smallcapReturn3m: 0.1,
    financialsReturn3m: 0.06,
    itReturn3m: 0.04,
  },
  {
    date: '2025-12-05',
    newRate: 5.25,
    deltaBps: -25,
    smallcapReturn3m: 0.03,
    financialsReturn3m: 0.02,
    itReturn3m: 0.01,
  },
]

export const RETURN_FIELD_BY_SECTOR = {
  smallcap: 'smallcapReturn3m',
  financials: 'financialsReturn3m',
  it: 'itReturn3m',
}
