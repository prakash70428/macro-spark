import styles from './ArticleBody.module.scss'

// Placeholder body until Sanity rich text renderer (Sprint 4)
const PLACEHOLDER_CONTENT = [
  {
    type: 'stats',
    items: [
      { value: '5.25%', label: 'Current Fed Funds Rate' },
      { value: '4th', label: 'Consecutive Hold' },
      { value: '2.9%', label: 'Core PCE (Latest)' },
      { value: '3.8%', label: 'Unemployment Rate' },
    ],
  },
  {
    type: 'p',
    text: 'The Federal Open Market Committee voted unanimously to maintain the target range for the federal funds rate at 5.25 to 5.50 percent. The decision aligns with market expectations but does little to resolve the uncertainty around the path of monetary easing.',
  },
  {
    type: 'p',
    text: 'Chair Powell, in his post-meeting press conference, struck a notably cautious tone. "We need to see more progress on inflation before we would consider rate cuts," he said, echoing language from previous statements but with a slightly sharper edge that markets interpreted as hawkish at the margin.',
  },
  {
    type: 'h2',
    text: 'What the Dissents Signal',
  },
  {
    type: 'p',
    text: 'While the vote was unanimous, the minutes from the prior meeting revealed that several members see the balance of risks as tilting toward keeping rates higher for longer. Two members specifically noted that core services inflation — which excludes shelter — remains above levels consistent with the 2% target.',
  },
  {
    type: 'blockquote',
    text: 'The risk of cutting too soon outweighs the risk of cutting too late, in our view. The Committee appears to agree.',
  },
  {
    type: 'h2',
    text: 'Market Reaction and Positioning',
  },
  {
    type: 'p',
    text: 'Treasury yields initially rallied on the decision before giving back gains as the press conference progressed. The 2-year note settled 4 basis points higher at 4.87%, while the 10-year moved modestly to 4.31%. Equity markets ended flat, a sign that the decision was already fully priced.',
  },
  {
    type: 'p',
    text: 'Fed funds futures pricing shifted to reflect just one rate cut in 2026, down from two cuts that were priced in at the start of the week. This recalibration has meaningful implications for duration risk across fixed income portfolios.',
  },
]

/**
 * @param {{ article: import('@/lib/research').Article }} props
 */
export default function ArticleBody({ article }) {
  return (
    <div className={styles.body}>
      {PLACEHOLDER_CONTENT.map((block, i) => {
        if (block.type === 'stats') {
          return (
            <div key={i} className={styles.stats}>
              {block.items.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          )
        }
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
        if (block.type === 'blockquote')
          return (
            <blockquote key={i}>
              <p>{block.text}</p>
            </blockquote>
          )
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}
