/**
 * Static site-wide metadata constants.
 * Dynamic per-page metadata is generated in each page.jsx via generateMetadata().
 */

export const SITE_NAME        = 'MacroSpark'
export const SITE_DESCRIPTION =
  'Professional intelligence platform for finance, economics, and global markets.'
export const SITE_URL         = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://macrospark.com'
export const TWITTER_HANDLE   = '@macrospark'
export const OG_IMAGE_DEFAULT = `${SITE_URL}/og/default.png`

export const SITE_METADATA = {
  name:        SITE_NAME,
  description: SITE_DESCRIPTION,
  url:         SITE_URL,
  twitter:     TWITTER_HANDLE,
  ogImage:     OG_IMAGE_DEFAULT,
}
