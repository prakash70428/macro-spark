import { ROUTES } from './routes'

/**
 * @typedef {{ label: string, href: string, description?: string }} NavItem
 */

/** @type {NavItem[]} */
export const PRIMARY_NAV = [
  {
    label: 'About',
    href: ROUTES.ABOUT_US,
    description: 'Who we are, our mission, and what MacroSpark stands for',
  },
  {
    label: 'Blogs',
    href: ROUTES.BLOGS,
    description: 'Market commentary, macro perspectives, and opinion pieces',
  },
  {
    label: 'Articles',
    href: ROUTES.ARTICLES,
    description: 'In-depth articles available to read and download as PDF',
  },
  {
    label: 'Research',
    href: ROUTES.RESEARCH,
    description: 'Peer-reviewed research papers on finance and economics',
  },
  {
    label: 'Quant Projects',
    href: ROUTES.QUANT_PROJECTS,
    description: 'Quantitative finance projects built in Python',
  },
  {
    label: 'Labs',
    href: ROUTES.LABS,
    description: 'AI-powered and quantitative finance tools',
  },
]

/** @type {NavItem[]} */
export const FOOTER_NAV_PRODUCT = [
  { label: 'About', href: ROUTES.ABOUT_US },
  { label: 'Blogs', href: ROUTES.BLOGS },
  { label: 'Articles', href: ROUTES.ARTICLES },
  { label: 'Research', href: ROUTES.RESEARCH },
  { label: 'Quant Projects', href: ROUTES.QUANT_PROJECTS },
  { label: 'Labs', href: ROUTES.LABS },
  { label: 'Newsletter', href: ROUTES.NEWSLETTER },
]

/** @type {NavItem[]} */
export const FOOTER_NAV_COMPANY = [
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Contact', href: ROUTES.CONTACT },
  { label: 'Privacy', href: ROUTES.PRIVACY },
  { label: 'Terms', href: ROUTES.TERMS },
]
