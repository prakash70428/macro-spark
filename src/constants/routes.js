/**
 * Application route constants.
 * Single source of truth — use these in <Link href=...>, router.push(), and sitemap.
 */

export const ROUTES = /** @type {const} */ ({
  // ── Public ────────────────────────────────────────────────────────────────
  HOME: '/',
  ABOUT_US: '/about-us',
  BLOGS: '/blogs',
  ARTICLES: '/articles',
  RESEARCH: '/research',
  QUANT_PROJECTS: '/quant-projects',
  FINANCIAL_LITERACY: '/financial-literacy',
  NEWSLETTER: '/newsletter',
  // legacy — kept only for backward-compat dynamic builders below
  MARKETS: '/markets',

  // ── Company ───────────────────────────────────────────────────────────────
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',

  // ── Auth ──────────────────────────────────────────────────────────────────
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // ── Protected ─────────────────────────────────────────────────────────────
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  BOOKMARKS: '/bookmarks',

  // ── Dynamic builders ──────────────────────────────────────────────────────
  /** @param {string} ticker */
  MARKET_DETAIL: (ticker) => `/markets/${ticker.toLowerCase()}`,

  /** @param {string} slug */
  ARTICLE: (slug) => `/articles/${slug}`,
})

/** Routes accessible without authentication */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT_US,
  ROUTES.BLOGS,
  ROUTES.ARTICLES,
  ROUTES.RESEARCH,
  ROUTES.QUANT_PROJECTS,
  ROUTES.FINANCIAL_LITERACY,
  ROUTES.NEWSLETTER,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
  ROUTES.COOKIES,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
]
