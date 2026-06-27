import { EB_Garamond, Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import Providers from './providers'
import '@/styles/main.scss'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: 'MacroSpark — Finance, Economics & Markets Intelligence',
    template: '%s | MacroSpark',
  },
  description:
    'Professional intelligence platform for finance, economics, and global markets. ' +
    'In-depth analysis, real-time data, and expert commentary.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://macrospark.com'
  ),
  openGraph: {
    type: 'website',
    siteName: 'MacroSpark',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@macrospark',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0a0a0b',
  },
}

export default function RootLayout({ children }) {
  const fontClasses = [
    ebGaramond.variable,
    inter.variable,
    playfairDisplay.variable,
    jetbrainsMono.variable,
  ].join(' ')

  return (
    <html
      lang="en"
      data-theme="dark"
      className={fontClasses}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
