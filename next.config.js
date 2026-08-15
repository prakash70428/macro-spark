const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce strict React mode across the entire app
  reactStrictMode: true,

  // SCSS load paths — allows @use 'styles/abstracts' from any component module
  // without requiring relative paths like '../../../styles/abstracts'
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },

  // Image domains allowed for next/image optimisation
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // WebP + AVIF for modern browsers, JPEG fallback
    formats: ['image/avif', 'image/webp'],
  },

  // Compiler options — remove console.log in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Security headers — applied to every response
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    const redirects = [
      // /about was a duplicate of /about-us with stale placeholder content —
      // consolidate on the one real About page.
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
    ]

    if (process.env.NODE_ENV !== 'production') return redirects

    // Redirect www to non-www in production
    return [
      ...redirects,
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.macrospark.com' }],
        destination: 'https://macrospark.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
