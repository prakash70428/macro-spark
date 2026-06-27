/**
 * Mock research data — replaced by Sanity/API calls in Sprint 4.
 * All listing and detail functions live here so the data source
 * can be swapped without touching page components.
 */

/** @typedef {{ id: string, slug: string, title: string, excerpt: string, tag: string, category: string, type: string, author: { name: string, role: string }, date: string, readTime: string, featured?: boolean }} Article */

/** @type {Article[]} */
export const ARTICLES = [
  {
    id: '1', slug: 'fed-holds-rates-hawks-circling',
    title: 'Fed Holds Rates Steady — But Hawks Are Circling',
    excerpt: 'The Federal Reserve kept its benchmark rate unchanged for the fourth consecutive meeting, but dissenting voices within the FOMC signal a shift in risk appetite that markets have yet to fully price in.',
    tag: 'Monetary Policy', category: 'monetary-policy', type: 'article',
    author: { name: 'Sarah Chen', role: 'Senior Economist' },
    date: 'Jun 23, 2026', readTime: '6 min', featured: true,
  },
  {
    id: '2', slug: 'em-rally-dollar-weakness',
    title: 'EM Rally Driven by Dollar Weakness, Not Fundamentals',
    excerpt: 'A broad emerging market equity rally followed a softer dollar reading. But strip out the FX effect and the underlying growth story remains fragile.',
    tag: 'Emerging Markets', category: 'markets', type: 'brief',
    author: { name: 'James Okafor', role: 'EM Strategist' },
    date: 'Jun 23, 2026', readTime: '4 min',
  },
  {
    id: '3', slug: 'uk-gilts-gdp-surprise',
    title: 'UK Gilt Yields Hit 3-Month High on GDP Surprise',
    excerpt: 'Better-than-expected Q2 GDP data pushed gilt yields sharply higher, re-pricing rate cut expectations and triggering a bond market selloff.',
    tag: 'Fixed Income', category: 'fixed-income', type: 'article',
    author: { name: 'Priya Sharma', role: 'Fixed Income Analyst' },
    date: 'Jun 22, 2026', readTime: '5 min',
  },
  {
    id: '4', slug: 'gold-real-yields-consolidation',
    title: 'Gold Consolidates as Real Yields Soften',
    excerpt: 'Gold prices paused their rally as real yields dipped below 2%, but technical indicators suggest the uptrend remains intact heading into Q3.',
    tag: 'Commodities', category: 'commodities', type: 'data-story',
    author: { name: 'Marco Rossi', role: 'Commodities Analyst' },
    date: 'Jun 22, 2026', readTime: '3 min',
  },
  {
    id: '5', slug: 'ecb-minutes-rate-cut-signals',
    title: 'ECB Minutes: Rate Cut Signals Soften on Inflation Persistence',
    excerpt: 'The latest ECB meeting minutes reveal a governing council more divided than markets anticipated, with several members pushing back on the pace of easing.',
    tag: 'Monetary Policy', category: 'monetary-policy', type: 'research',
    author: { name: 'Elena Müller', role: 'European Macro' },
    date: 'Jun 21, 2026', readTime: '8 min',
  },
  {
    id: '6', slug: 'china-stimulus-property-sector',
    title: 'China\'s Stimulus Package Falls Short for Property Sector',
    excerpt: 'Beijing\'s latest round of support measures disappointed investors who had positioned for a more aggressive intervention in the beleaguered property market.',
    tag: 'Economics', category: 'economics', type: 'opinion',
    author: { name: 'Wei Zhang', role: 'Asia Macro' },
    date: 'Jun 21, 2026', readTime: '5 min',
  },
  {
    id: '7', slug: 'nvidia-ai-capex-cycle',
    title: 'NVIDIA and the AI Capex Cycle: Is the Market Pricing in Too Much?',
    excerpt: 'Semiconductor valuations have stretched to levels that imply sustained double-digit revenue growth for a decade. We model three scenarios.',
    tag: 'Equities', category: 'equities', type: 'research',
    author: { name: 'Tom Adeyemi', role: 'Equity Analyst' },
    date: 'Jun 20, 2026', readTime: '10 min',
  },
  {
    id: '8', slug: 'japan-yen-intervention-risk',
    title: 'Japan\'s FX Intervention Risk Is Rising — Here\'s the Threshold',
    excerpt: 'USD/JPY above 160 has historically triggered intervention. With the pair approaching that level again, we map the decision tree for the MoF.',
    tag: 'FX', category: 'fx', type: 'brief',
    author: { name: 'Hiroshi Tanaka', role: 'FX Strategist' },
    date: 'Jun 20, 2026', readTime: '4 min',
  },
  {
    id: '9', slug: 'oil-demand-outlook-iea',
    title: 'IEA Revises Oil Demand Outlook — What It Means for Energy Stocks',
    excerpt: 'The International Energy Agency\'s latest revision signals a more gradual energy transition than previously modelled, with implications for E&P valuations.',
    tag: 'Commodities', category: 'commodities', type: 'article',
    author: { name: 'Sarah Chen', role: 'Senior Economist' },
    date: 'Jun 19, 2026', readTime: '7 min',
  },
]

export const CATEGORIES = [
  { value: 'all',             label: 'All Topics' },
  { value: 'monetary-policy', label: 'Monetary Policy' },
  { value: 'markets',         label: 'Markets' },
  { value: 'economics',       label: 'Economics' },
  { value: 'fixed-income',    label: 'Fixed Income' },
  { value: 'equities',        label: 'Equities' },
  { value: 'commodities',     label: 'Commodities' },
  { value: 'fx',              label: 'FX' },
]

export const CONTENT_TYPES = [
  { value: 'all',        label: 'All Types' },
  { value: 'article',    label: 'Article' },
  { value: 'brief',      label: 'Brief' },
  { value: 'data-story', label: 'Data Story' },
  { value: 'research',   label: 'Research' },
  { value: 'opinion',    label: 'Opinion' },
]

export const SORT_OPTIONS = [
  { value: 'latest',   label: 'Latest' },
  { value: 'oldest',   label: 'Oldest' },
]

const PAGE_SIZE = 6

/**
 * @param {{ q?: string, category?: string, type?: string, sort?: string, page?: number }} params
 * @returns {{ articles: Article[], total: number, page: number, totalPages: number }}
 */
export function getArticles({ q = '', category = 'all', type = 'all', sort = 'latest', page = 1 } = {}) {
  let results = [...ARTICLES]

  if (q) {
    const query = q.toLowerCase()
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tag.toLowerCase().includes(query)
    )
  }

  if (category !== 'all') results = results.filter((a) => a.category === category)
  if (type !== 'all')     results = results.filter((a) => a.type === type)

  const total = results.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * PAGE_SIZE

  return {
    articles: results.slice(start, start + PAGE_SIZE),
    total,
    page: safePage,
    totalPages,
  }
}

/** @param {string} slug @returns {Article | undefined} */
export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug)
}

/** @param {string} category @param {string} excludeSlug @returns {Article[]} */
export function getRelated(category, excludeSlug) {
  return ARTICLES.filter((a) => a.category === category && a.slug !== excludeSlug).slice(0, 3)
}
