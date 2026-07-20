import LabToolLayout from '@/components/features/labs/LabToolLayout'
import StatTile from '@/components/features/labs/StatTile'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'india-economy-dashboard')

// Static sample data — illustrative only, not a live feed.
const INDICATORS = [
  {
    label: 'GDP Growth (YoY)',
    value: '7.2%',
    trendDirection: 'up',
    trendLabel: '+0.3%',
    sparklineData: [6.1, 6.4, 6.8, 6.6, 7.0, 7.2],
  },
  {
    label: 'Inflation (CPI)',
    value: '4.8%',
    trendDirection: 'down',
    trendLabel: '-0.4%',
    sparklineData: [6.2, 5.9, 5.5, 5.2, 5.1, 4.8],
  },
  {
    label: 'Repo Rate',
    value: '6.50%',
    trendDirection: 'flat',
    trendLabel: 'unchanged',
    sparklineData: [6.5, 6.5, 6.5, 6.5, 6.5, 6.5],
  },
  {
    label: 'Unemployment Rate',
    value: '7.8%',
    trendDirection: 'down',
    trendLabel: '-0.5%',
    sparklineData: [8.7, 8.5, 8.2, 8.0, 7.9, 7.8],
  },
  {
    label: 'Fiscal Deficit (% of GDP)',
    value: '5.1%',
    trendDirection: 'down',
    trendLabel: '-0.6%',
    sparklineData: [6.4, 6.0, 5.8, 5.6, 5.3, 5.1],
  },
  {
    label: 'USD/INR Exchange Rate',
    value: '₹83.42',
    trendDirection: 'up',
    trendLabel: '+0.6%',
    sparklineData: [81.9, 82.3, 82.6, 82.9, 83.1, 83.42],
  },
  {
    label: 'Forex Reserves',
    value: '$645B',
    trendDirection: 'up',
    trendLabel: '+2.1%',
    sparklineData: [598, 610, 618, 625, 634, 645],
  },
]

export default function IndiaEconomyDashboardPage() {
  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <p className={styles.note}>
        This is a UI preview — indicators below use static sample data, not a live economic data
        feed.
      </p>
      <div className={styles.grid}>
        {INDICATORS.map((indicator) => (
          <StatTile key={indicator.label} {...indicator} />
        ))}
      </div>
    </LabToolLayout>
  )
}
