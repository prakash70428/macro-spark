'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import { NumberField, SliderField } from '@/components/features/labs/LabInputGroup'
import StatTile from '@/components/features/labs/StatTile'
import LineChart from '@/components/features/labs/charts/LineChart'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'stock-market-simulator')

const STARTING_CAPITAL = 100000
const STARTING_PRICE = 100

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function formatPct(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export default function StockMarketSimulatorPage() {
  const [drift, setDrift] = useState(0.05)
  const [vol, setVol] = useState(1.5)

  const [cash, setCash] = useState(STARTING_CAPITAL)
  const [shares, setShares] = useState(0)
  const [priceHistory, setPriceHistory] = useState([STARTING_PRICE])
  const [portfolioHistory, setPortfolioHistory] = useState([STARTING_CAPITAL])
  const [day, setDay] = useState(0)

  const [buyQty, setBuyQty] = useState('10')
  const [sellQty, setSellQty] = useState('10')

  const currentPrice = priceHistory[priceHistory.length - 1]
  const portfolioValue = cash + shares * currentPrice
  const totalReturn = ((portfolioValue - STARTING_CAPITAL) / STARTING_CAPITAL) * 100

  const buyQtyNum = Number(buyQty) || 0
  const sellQtyNum = Number(sellQty) || 0
  const buyDisabled = buyQtyNum <= 0 || buyQtyNum * currentPrice > cash
  const sellDisabled = sellQtyNum <= 0 || sellQtyNum > shares

  function handleAdvanceDay() {
    const z = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random())
    const driftDecimal = drift / 100
    const volDecimal = vol / 100
    let nextPrice =
      currentPrice * Math.exp(driftDecimal - 0.5 * volDecimal ** 2 + volDecimal * z)
    nextPrice = Math.max(1, nextPrice)

    setPriceHistory((prev) => [...prev, nextPrice])
    setPortfolioHistory((prev) => [...prev, cash + shares * nextPrice])
    setDay((d) => d + 1)
  }

  function handleBuy() {
    if (buyDisabled) return
    const cost = buyQtyNum * currentPrice
    const newCash = cash - cost
    const newShares = shares + buyQtyNum
    setCash(newCash)
    setShares(newShares)
    setPortfolioHistory((prev) => {
      const next = [...prev]
      next[next.length - 1] = newCash + newShares * currentPrice
      return next
    })
  }

  function handleSell() {
    if (sellDisabled) return
    const proceeds = sellQtyNum * currentPrice
    const newCash = cash + proceeds
    const newShares = shares - sellQtyNum
    setCash(newCash)
    setShares(newShares)
    setPortfolioHistory((prev) => {
      const next = [...prev]
      next[next.length - 1] = newCash + newShares * currentPrice
      return next
    })
  }

  function handleReset() {
    setCash(STARTING_CAPITAL)
    setShares(0)
    setPriceHistory([STARTING_PRICE])
    setPortfolioHistory([STARTING_CAPITAL])
    setDay(0)
  }

  const xLabels = priceHistory.map((_, i) => `Day ${i}`)
  const baselineSeries = portfolioHistory.map(() => STARTING_CAPITAL)

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div className={styles.tickerRow}>
          <span className={styles.ticker}>SIMX</span>
          <span className={styles.tickerLabel}>Simulated stock — not a real security</span>
          <span className={styles.tickerPrice}>{formatCurrency(currentPrice)}</span>
        </div>

        <SliderField
          label="Daily drift"
          value={drift}
          onChange={setDrift}
          min={-1}
          max={1}
          step={0.05}
          unit="%"
        />
        <SliderField
          label="Daily volatility"
          value={vol}
          onChange={setVol}
          min={0.2}
          max={5}
          step={0.1}
          unit="%"
        />

        <div className={styles.actions}>
          <Button variant="primary" onClick={handleAdvanceDay}>
            Advance 1 Day
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Reset Simulation
          </Button>
        </div>

        <div className={styles.tradeRow}>
          <div className={styles.tradeGroup}>
            <NumberField label="Quantity to buy" value={buyQty} onChange={setBuyQty} min={0} step={1} />
            <Button variant="primary" disabled={buyDisabled} onClick={handleBuy}>
              Buy
            </Button>
          </div>
          <div className={styles.tradeGroup}>
            <NumberField
              label="Quantity to sell"
              value={sellQty}
              onChange={setSellQty}
              min={0}
              step={1}
            />
            <Button variant="secondary" disabled={sellDisabled} onClick={handleSell}>
              Sell
            </Button>
          </div>
        </div>

        <p className={styles.note}>
          SIMX is a fictional ticker whose price follows a random geometric Brownian motion walk
          driven by the drift and volatility sliders above — it has no connection to any real
          traded security. Cash, holdings, and portfolio value are computed live from your trades,
          for illustration only.
        </p>
      </div>

      <div className={styles.results}>
        <div className={styles.grid}>
          <StatTile label="Cash" value={formatCurrency(cash)} />
          <StatTile label="Shares Held" value={shares.toLocaleString('en-IN')} />
          <StatTile
            label="Portfolio Value"
            value={formatCurrency(portfolioValue)}
            trendDirection={totalReturn > 0 ? 'up' : totalReturn < 0 ? 'down' : 'flat'}
            trendLabel={formatPct(totalReturn)}
          />
          <StatTile
            label="Total Return"
            value={formatPct(totalReturn)}
            trendDirection={totalReturn > 0 ? 'up' : totalReturn < 0 ? 'down' : 'flat'}
          />
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.resultTitle}>Portfolio Value — Day {day}</h2>
          <LineChart
            ariaLabel="Portfolio value over simulated trading days"
            xLabels={xLabels}
            yFormat={(v) => formatCurrency(v)}
            series={[
              {
                id: 'baseline',
                label: 'Starting Capital',
                color: '#94a3b8',
                values: baselineSeries,
              },
              {
                id: 'portfolio',
                label: 'Portfolio Value',
                color: '#3b82f6',
                values: portfolioHistory,
              },
            ]}
          />
        </div>
      </div>
    </LabToolLayout>
  )
}
