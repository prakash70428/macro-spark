/**
 * Pure finance/quant calculation engine used by the Labs tools
 * (IPO Performance Analyzer, Portfolio Backtesting Tool, Interest Rate Impact Model).
 * Every function is deterministic and dependency-free so results can be unit tested
 * and trusted to reflect the input dataset, not hardcoded numbers.
 */

/**
 * Compound Annual Growth Rate.
 * @param {number} beginValue
 * @param {number} endValue
 * @param {number} years
 * @returns {number} CAGR as a decimal (e.g. 0.12 = 12%)
 */
export function calcCAGR(beginValue, endValue, years) {
  if (beginValue <= 0 || years <= 0) return 0
  return Math.pow(endValue / beginValue, 1 / years) - 1
}

/**
 * Simple total return between two values.
 * @param {number} beginValue
 * @param {number} endValue
 * @returns {number} decimal return (e.g. 0.25 = 25%)
 */
export function calcTotalReturn(beginValue, endValue) {
  if (beginValue <= 0) return 0
  return (endValue - beginValue) / beginValue
}

/**
 * Period-over-period % returns from a price/value series.
 * @param {number[]} values
 * @returns {number[]} decimal returns, length = values.length - 1
 */
export function periodReturns(values) {
  const returns = []
  for (let i = 1; i < values.length; i++) {
    const prev = values[i - 1]
    returns.push(prev === 0 ? 0 : (values[i] - prev) / prev)
  }
  return returns
}

/**
 * Sample standard deviation of a return series.
 * @param {number[]} returns
 * @returns {number}
 */
export function calcVolatility(returns) {
  if (returns.length < 2) return 0
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (returns.length - 1)
  return Math.sqrt(variance)
}

/**
 * Sharpe ratio from a series of annual (or annualized) returns.
 * @param {number[]} returns decimal returns, one per period
 * @param {number} riskFreeRate decimal annual risk-free rate (e.g. 0.06)
 * @returns {number}
 */
export function calcSharpeRatio(returns, riskFreeRate = 0) {
  if (returns.length < 2) return 0
  const excess = returns.map((r) => r - riskFreeRate)
  const meanExcess = excess.reduce((sum, r) => sum + r, 0) / excess.length
  const sd = calcVolatility(excess)
  return sd < 1e-9 ? 0 : meanExcess / sd
}

/**
 * Builds a cumulative equity curve from an initial investment and a return series.
 * @param {number} initialInvestment
 * @param {number[]} returns decimal returns, one per period
 * @returns {number[]} equity value at the start plus after each period (length = returns.length + 1)
 */
export function buildEquityCurve(initialInvestment, returns) {
  const curve = [initialInvestment]
  let value = initialInvestment
  for (const r of returns) {
    value = value * (1 + r)
    curve.push(value)
  }
  return curve
}

/**
 * Maximum peak-to-trough drawdown across an equity curve.
 * @param {number[]} equityCurve
 * @returns {number} decimal drawdown, negative or zero (e.g. -0.184 = -18.4%)
 */
export function calcMaxDrawdown(equityCurve) {
  let peak = -Infinity
  let maxDrawdown = 0
  for (const value of equityCurve) {
    if (value > peak) peak = value
    const drawdown = peak === 0 ? 0 : (value - peak) / peak
    if (drawdown < maxDrawdown) maxDrawdown = drawdown
  }
  return maxDrawdown
}

/**
 * Pearson correlation coefficient between two equal-length series.
 * @param {number[]} xs
 * @param {number[]} ys
 * @returns {number} in [-1, 1]
 */
export function pearsonCorrelation(xs, ys) {
  const n = Math.min(xs.length, ys.length)
  if (n < 2) return 0

  const meanX = xs.slice(0, n).reduce((sum, v) => sum + v, 0) / n
  const meanY = ys.slice(0, n).reduce((sum, v) => sum + v, 0) / n

  let numerator = 0
  let sumSqX = 0
  let sumSqY = 0
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX
    const dy = ys[i] - meanY
    numerator += dx * dy
    sumSqX += dx * dx
    sumSqY += dy * dy
  }

  const denominator = Math.sqrt(sumSqX * sumSqY)
  return denominator === 0 ? 0 : numerator / denominator
}

/**
 * Ordinary least squares linear regression (y = slope * x + intercept).
 * @param {number[]} xs
 * @param {number[]} ys
 * @returns {{ slope: number, intercept: number, r2: number }}
 */
export function linearRegression(xs, ys) {
  const n = Math.min(xs.length, ys.length)
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 }

  const meanX = xs.slice(0, n).reduce((sum, v) => sum + v, 0) / n
  const meanY = ys.slice(0, n).reduce((sum, v) => sum + v, 0) / n

  let sumXY = 0
  let sumXX = 0
  for (let i = 0; i < n; i++) {
    sumXY += (xs[i] - meanX) * (ys[i] - meanY)
    sumXX += (xs[i] - meanX) ** 2
  }

  const slope = sumXX === 0 ? 0 : sumXY / sumXX
  const intercept = meanY - slope * meanX
  const r = pearsonCorrelation(xs.slice(0, n), ys.slice(0, n))

  return { slope, intercept, r2: r * r }
}

/**
 * Interprets a correlation coefficient into a human-readable strength label.
 * @param {number} r
 * @returns {'very weak' | 'weak' | 'moderate' | 'strong' | 'very strong'}
 */
export function correlationStrength(r) {
  const abs = Math.abs(r)
  if (abs < 0.1) return 'negligible'
  if (abs < 0.3) return 'weak'
  if (abs < 0.5) return 'moderate'
  if (abs < 0.7) return 'strong'
  return 'very strong'
}
