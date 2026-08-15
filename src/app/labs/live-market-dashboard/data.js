/**
 * LIVE MARKET DASHBOARD — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static sample dataset — illustrative only, not a live feed. The index/
 * sector NAMES below (Nifty 50, Sensex, etc.) are used only as generic labels
 * for a sample ticker layout — the price series are a deterministic,
 * seeded random walk starting from a realistic order-of-magnitude level, not
 * a claim about any real index's actual current value. Daily moves are
 * bounded to roughly ±1.5%. Connect a real feed (e.g. an NSE/BSE market data
 * API) to make this live.
 */

// Deterministic seeded PRNG (mulberry32) so the walk is stable across builds/renders.
function mulberry32(seed) {
  let s = seed
  return function rand() {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededWalk(start, seed, days = 30, maxMove = 0.014) {
  const rand = mulberry32(seed)
  const values = [Math.round(start * 100) / 100]
  for (let i = 1; i < days; i++) {
    const pctMove = (rand() - 0.5) * 2 * maxMove
    const prev = values[values.length - 1]
    values.push(Math.round(prev * (1 + pctMove) * 100) / 100)
  }
  return values
}

export const DAY_LABELS = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

export const INDICES = [
  { id: 'nifty50', name: 'Nifty 50', color: '#3b82f6', series: seededWalk(24000, 1) },
  { id: 'sensex', name: 'Sensex', color: '#f59e0b', series: seededWalk(79000, 2) },
  { id: 'banknifty', name: 'Bank Nifty', color: '#8b5cf6', series: seededWalk(51000, 3) },
  { id: 'niftyit', name: 'Nifty IT', color: '#10b981', series: seededWalk(42000, 4) },
  { id: 'niftyauto', name: 'Nifty Auto', color: '#ef4444', series: seededWalk(24000, 5) },
  { id: 'niftypharma', name: 'Nifty Pharma', color: '#06b6d4', series: seededWalk(20000, 6) },
]
