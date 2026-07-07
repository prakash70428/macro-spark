/**
 * ─── ARTICLES DATA ────────────────────────────────────────────────────────────
 *
 * Naya article add karna ho toh do kaam karo:
 *
 *  STEP 1 — PDF file yahan daalo:
 *            macro_spark/public/articles/<file-name>.pdf
 *
 *  STEP 2 — Neeche array mein ek object add karo:
 *
 *  {
 *    title:    'Article ka title',
 *    excerpt:  'Short description (2-3 lines)',
 *    date:     'Jun 27, 2026',
 *    pages:    12,              // PDF ke kitne pages hain
 *    category: 'FX',           // Categories list mein se koi ek
 *    pdf:      '/articles/file-name.pdf',  // public/articles/ ke andr wali file
 *  },
 *
 * Naya category banana ho toh CATEGORIES array mein bhi daal do.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const ARTICLES = [
  {
    title: 'The Yield Curve as a Recession Predictor: A 40-Year Review',
    excerpt:
      'We examine the predictive power of the 2s10s spread across eight recession cycles since 1980, testing whether the relationship still holds in a post-QE world.',
    date: 'Jun 15, 2026',
    pages: 14,
    category: 'Fixed Income',
    pdf: '/articles/yield-curve-recession-predictor.pdf',
  },
  {
    title: 'Dollar Milkshake Theory: Evidence For and Against',
    excerpt:
      "Brent Johnson's Dollar Milkshake thesis has attracted significant attention. This article stress-tests the mechanism against current capital flow data.",
    date: 'Jun 10, 2026',
    pages: 11,
    category: 'FX',
    pdf: '/articles/dollar-milkshake-theory.pdf',
  },
  {
    title: 'ESG Premium or ESG Discount? What the Data Actually Shows',
    excerpt:
      'A meta-analysis of 60 empirical studies on ESG factor returns. We separate signal from marketing across different time horizons and geographies.',
    date: 'Jun 5, 2026',
    pages: 18,
    category: 'Equities',
    pdf: '/articles/esg-premium-discount.pdf',
  },
  {
    title: 'Inflation Regimes and Asset Allocation: Lessons from 1970–2024',
    excerpt:
      'Using historical inflation regime data, we construct asset allocation frameworks that outperformed traditional 60/40 portfolios across high-inflation periods.',
    date: 'May 28, 2026',
    pages: 22,
    category: 'Macro',
    pdf: '/articles/inflation-regimes-asset-allocation.pdf',
  },
  {
    title: 'Central Bank Digital Currencies: Design Trade-offs and Systemic Risk',
    excerpt:
      'A technical review of CBDC architectures across 12 countries, examining disintermediation risk, privacy trade-offs, and monetary policy implications.',
    date: 'May 20, 2026',
    pages: 16,
    category: 'Monetary Policy',
    pdf: '/articles/cbdc-design-tradeoffs.pdf',
  },
  {
    title: 'Private Credit Boom: Opportunity or Systemic Risk?',
    excerpt:
      'Private credit AUM has doubled in five years. We examine covenant quality, illiquidity premiums, and whether the market is pricing default risk correctly.',
    date: 'May 12, 2026',
    pages: 13,
    category: 'Credit',
    pdf: '/articles/private-credit-boom.pdf',
  },
]

export const CATEGORIES = [
  'All',
  'Fixed Income',
  'FX',
  'Equities',
  'Macro',
  'Monetary Policy',
  'Credit',
]
