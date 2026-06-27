import { ARTICLES } from '@/lib/research'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://macrospark.com'

const STATIC_ROUTES = [
  { path: '/',                    priority: 1.0,  changeFrequency: 'daily'   },
  { path: '/markets',             priority: 0.9,  changeFrequency: 'hourly'  },
  { path: '/analysis',            priority: 0.9,  changeFrequency: 'daily'   },
  { path: '/data',                priority: 0.8,  changeFrequency: 'daily'   },
  { path: '/podcasts',            priority: 0.8,  changeFrequency: 'weekly'  },
  { path: '/deep-dives',          priority: 0.8,  changeFrequency: 'weekly'  },
  { path: '/financial-literacy',  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/newsletter',          priority: 0.7,  changeFrequency: 'weekly'  },
  { path: '/about',               priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/contact',             priority: 0.5,  changeFrequency: 'monthly' },
  { path: '/privacy',             priority: 0.3,  changeFrequency: 'yearly'  },
  { path: '/terms',               priority: 0.3,  changeFrequency: 'yearly'  },
  { path: '/cookies',             priority: 0.3,  changeFrequency: 'yearly'  },
]

/**
 * Next.js 14 App Router sitemap — auto-serialised to /sitemap.xml.
 * Dynamic article slugs are pulled from mock data (replace with DB query in Sprint 6).
 */
export default function sitemap() {
  const now = new Date().toISOString()

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url:             `${BASE_URL}${path}`,
    lastModified:    now,
    changeFrequency,
    priority,
  }))

  const articleEntries = ARTICLES.map((article) => ({
    url:             `${BASE_URL}/analysis/${article.slug}`,
    lastModified:    new Date(article.date).toISOString(), // actual publish date, not build time
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticEntries, ...articleEntries]
}
