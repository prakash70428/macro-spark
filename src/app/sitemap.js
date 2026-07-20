const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://macrospark.com'

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/about-us', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/blogs', priority: 0.9, changeFrequency: 'daily' },
  { path: '/articles', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/research', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/quant-projects', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/labs', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/labs/earnings-analyzer', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/labs/statement-explainer', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/labs/portfolio-optimizer', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/labs/dcf-calculator', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/labs/india-economy-dashboard', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/labs/risk-analytics', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/newsletter', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap() {
  const now = new Date().toISOString()

  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
