const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://macrospark.com'

/**
 * Next.js 14 App Router robots — auto-serialised to /robots.txt.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/settings', '/bookmarks', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
