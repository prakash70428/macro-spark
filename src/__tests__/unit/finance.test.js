import {
  calcCAGR,
  calcTotalReturn,
  periodReturns,
  calcVolatility,
  calcSharpeRatio,
  buildEquityCurve,
  calcMaxDrawdown,
  pearsonCorrelation,
  linearRegression,
  correlationStrength,
} from '@/lib/finance'

describe('calcCAGR', () => {
  it('computes compound annual growth rate', () => {
    expect(calcCAGR(100, 200, 1)).toBeCloseTo(1, 5)
    expect(calcCAGR(100, 121, 2)).toBeCloseTo(0.1, 5)
  })

  it('returns 0 for invalid inputs', () => {
    expect(calcCAGR(0, 100, 1)).toBe(0)
    expect(calcCAGR(100, 100, 0)).toBe(0)
  })
})

describe('calcTotalReturn', () => {
  it('computes simple total return', () => {
    expect(calcTotalReturn(100, 125)).toBeCloseTo(0.25, 5)
    expect(calcTotalReturn(100, 80)).toBeCloseTo(-0.2, 5)
  })
})

describe('periodReturns', () => {
  it('computes period-over-period returns', () => {
    const returns = periodReturns([100, 110, 121])
    expect(returns[0]).toBeCloseTo(0.1, 5)
    expect(returns[1]).toBeCloseTo(0.1, 5)
  })
})

describe('calcVolatility', () => {
  it('returns 0 for constant series', () => {
    expect(calcVolatility([0.1, 0.1, 0.1])).toBeCloseTo(0, 10)
  })

  it('computes sample standard deviation', () => {
    // returns: 0.1, 0.2, 0.3 -> mean 0.2, sample variance 0.01, sd 0.1
    expect(calcVolatility([0.1, 0.2, 0.3])).toBeCloseTo(0.1, 5)
  })
})

describe('calcSharpeRatio', () => {
  it('is 0 when volatility is 0', () => {
    expect(calcSharpeRatio([0.1, 0.1, 0.1], 0.05)).toBe(0)
  })

  it('computes a positive Sharpe ratio for returns above the risk-free rate', () => {
    const sharpe = calcSharpeRatio([0.12, 0.18, 0.15, 0.2], 0.06)
    expect(sharpe).toBeGreaterThan(0)
  })
})

describe('buildEquityCurve', () => {
  it('compounds an initial investment through a return series', () => {
    const curve = buildEquityCurve(1000, [0.1, -0.1])
    expect(curve[0]).toBe(1000)
    expect(curve[1]).toBeCloseTo(1100, 5)
    expect(curve[2]).toBeCloseTo(990, 5)
  })
})

describe('calcMaxDrawdown', () => {
  it('finds the largest peak-to-trough decline', () => {
    const curve = [100, 120, 90, 110, 60, 130]
    // peak 120 -> trough 60 = -50%
    expect(calcMaxDrawdown(curve)).toBeCloseTo(-0.5, 5)
  })

  it('is 0 for a monotonically increasing curve', () => {
    expect(calcMaxDrawdown([100, 110, 120, 130])).toBe(0)
  })
})

describe('pearsonCorrelation', () => {
  it('is 1 for perfectly correlated series', () => {
    expect(pearsonCorrelation([1, 2, 3, 4], [2, 4, 6, 8])).toBeCloseTo(1, 5)
  })

  it('is -1 for perfectly inversely correlated series', () => {
    expect(pearsonCorrelation([1, 2, 3, 4], [8, 6, 4, 2])).toBeCloseTo(-1, 5)
  })
})

describe('linearRegression', () => {
  it('recovers slope and intercept for a perfect line', () => {
    const { slope, intercept, r2 } = linearRegression([1, 2, 3, 4], [3, 5, 7, 9])
    expect(slope).toBeCloseTo(2, 5)
    expect(intercept).toBeCloseTo(1, 5)
    expect(r2).toBeCloseTo(1, 5)
  })
})

describe('correlationStrength', () => {
  it('labels correlation strength buckets', () => {
    expect(correlationStrength(0.05)).toBe('negligible')
    expect(correlationStrength(0.2)).toBe('weak')
    expect(correlationStrength(0.4)).toBe('moderate')
    expect(correlationStrength(0.6)).toBe('strong')
    expect(correlationStrength(-0.85)).toBe('very strong')
  })
})
