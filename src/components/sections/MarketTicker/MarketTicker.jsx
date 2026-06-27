import clsx from 'clsx'
import styles from './MarketTicker.module.scss'

const TICKERS = [
  { symbol: 'S&P 500',   value: '5,482.32', change: '+0.82%', direction: 'positive' },
  { symbol: 'NASDAQ',    value: '17,461',   change: '+1.14%', direction: 'positive' },
  { symbol: 'DOW',       value: '38,921',   change: '+0.31%', direction: 'positive' },
  { symbol: 'FTSE 100',  value: '8,204',    change: '−0.22%', direction: 'negative' },
  { symbol: 'NIKKEI',    value: '38,487',   change: '+0.67%', direction: 'positive' },
  { symbol: 'DAX',       value: '18,132',   change: '−0.11%', direction: 'negative' },
  { symbol: '10Y UST',   value: '4.312%',   change: '−3bp',   direction: 'negative' },
  { symbol: 'EUR/USD',   value: '1.0842',   change: '+0.21%', direction: 'positive' },
  { symbol: 'GBP/USD',   value: '1.2714',   change: '−0.09%', direction: 'negative' },
  { symbol: 'USD/JPY',   value: '157.42',   change: '+0.18%', direction: 'positive' },
  { symbol: 'Gold',      value: '$2,341',   change: '+0.54%', direction: 'positive' },
  { symbol: 'WTI Oil',   value: '$78.32',   change: '−1.21%', direction: 'negative' },
  { symbol: 'BTC',       value: '$67,420',  change: '+2.34%', direction: 'positive' },
  { symbol: 'VIX',       value: '14.82',    change: '−0.44%', direction: 'negative' },
]

// Duplicate for seamless loop
const ITEMS = [...TICKERS, ...TICKERS]

export default function MarketTicker() {
  return (
    <div className={styles.wrapper} aria-label="Market data ticker" role="region" aria-live="off">
      <div className={styles.liveBadge} aria-hidden="true">
        <span className={styles.liveDot} />
        <span className={styles.liveLabel}>Live</span>
      </div>

      <div className={styles.track}>
        {ITEMS.map((t, i) => (
          <div key={`${t.symbol}-${i}`} className={styles.item}>
            <span className={styles.symbol}>{t.symbol}</span>
            <span className={styles.value}>{t.value}</span>
            <span className={clsx(styles.change, styles[t.direction])}>
              <span className={styles.arrow} aria-hidden="true">
                {t.direction === 'positive' ? '▲' : t.direction === 'negative' ? '▼' : ''}
              </span>
              {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
