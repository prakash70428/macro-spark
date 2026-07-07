/**
 * Blog posts data.
 * Client ne naya blog add karna ho toh bas is array mein ek object add karo.
 *
 * Fields:
 *   slug     — URL mein aayega: /blogs/<slug>  (unique, lowercase, hyphens only)
 *   title    — Blog ka title
 *   excerpt  — Short summary (2-3 lines)
 *   date     — Display date, e.g. 'Jun 20, 2026'
 *   readTime — e.g. '5 min read'
 *   category — Must match one of CATEGORIES below (case-sensitive)
 */

export const BLOGS = [
  {
    slug: 'fed-pivot-what-it-means',
    title: 'The Fed Pivot: What It Actually Means for Markets',
    excerpt:
      'Markets have been pricing in rate cuts for months. But what does a genuine Fed pivot look like, and how should investors position for it?',
    date: 'Jun 20, 2026',
    readTime: '5 min read',
    category: 'Monetary Policy',
  },
  {
    slug: 'dollar-hegemony-2026',
    title: "Dollar Hegemony Is Not Dying — It's Evolving",
    excerpt:
      'The "de-dollarisation" narrative is louder than ever. The data tells a more nuanced story about reserve currency dynamics.',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    category: 'FX',
  },
  {
    slug: 'china-property-overhang',
    title: "China's Property Overhang: Still No Clear Floor",
    excerpt:
      "Three years into the crisis, China's property sector remains a structural drag on growth. We examine what a bottom might actually look like.",
    date: 'Jun 15, 2026',
    readTime: '8 min read',
    category: 'Emerging Markets',
  },
  {
    slug: 'uk-gilts-fiscal-space',
    title: 'UK Fiscal Space Is Tighter Than the Government Admits',
    excerpt:
      "With gilt yields elevated and the OBR forecasts looking optimistic, the UK's fiscal room for manoeuvre is narrower than official statements suggest.",
    date: 'Jun 12, 2026',
    readTime: '6 min read',
    category: 'Fixed Income',
  },
  {
    slug: 'ai-productivity-paradox',
    title: 'The AI Productivity Paradox: Too Early to Tell',
    excerpt:
      'AI investment is surging. GDP productivity data is not. We look at why the productivity gains from AI may take longer to show up — and why that is historically normal.',
    date: 'Jun 10, 2026',
    readTime: '9 min read',
    category: 'Economics',
  },
  {
    slug: 'commodity-supercycle-reality',
    title: 'Is the Commodity Supercycle Real This Time?',
    excerpt:
      'Energy transition, deglobalisation, and underinvestment in extraction are cited as drivers. We stress-test the supercycle thesis against the data.',
    date: 'Jun 7, 2026',
    readTime: '10 min read',
    category: 'Commodities',
  },
]

// Naya category add karna ho toh yahan bhi daal do
export const CATEGORIES = [
  'All',
  'Monetary Policy',
  'FX',
  'Emerging Markets',
  'Fixed Income',
  'Economics',
  'Commodities',
]
