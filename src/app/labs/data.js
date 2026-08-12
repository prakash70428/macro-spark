/**
 * ─── MACROSPARK LABS DATA ─────────────────────────────────────────────────────
 *
 * Single source of truth for the Labs hub grid. Each tool is built out in a
 * later phase — until its page exists, leave `status: 'coming-soon'` and
 * `href: null` so the hub card renders but isn't clickable.
 *
 * When a tool's page ships:
 *   1. Set `status: 'available'`
 *   2. Set `href: ROUTES.LABS_TOOL('<slug>')`
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ROUTES } from '@/constants/routes'

export const LABS_TOOLS = [
  {
    id: 'earnings-analyzer',
    slug: 'earnings-analyzer',
    title: 'AI Earnings Report Analyzer',
    description:
      "Upload a company's annual report or financial statements and receive an AI-generated summary covering business overview, financial performance, risks, opportunities, key ratios, and investment insights.",
    phase: 1,
    icon: 'document',
    status: 'available',
    href: ROUTES.LABS_TOOL('earnings-analyzer'),
  },
  {
    id: 'statement-explainer',
    slug: 'statement-explainer',
    title: 'AI Financial Statement Explainer',
    description:
      'Upload a Balance Sheet, Income Statement, or Cash Flow Statement and receive a simple AI-powered explanation of the company’s financial health.',
    phase: 1,
    icon: 'explain',
    status: 'available',
    href: ROUTES.LABS_TOOL('statement-explainer'),
  },
  {
    id: 'portfolio-optimizer',
    slug: 'portfolio-optimizer',
    title: 'Portfolio Optimizer',
    description:
      'Build an optimized investment portfolio based on risk tolerance, expected returns, and diversification using quantitative finance principles.',
    phase: 2,
    icon: 'pie',
    status: 'available',
    href: ROUTES.LABS_TOOL('portfolio-optimizer'),
  },
  {
    id: 'dcf-calculator',
    slug: 'dcf-calculator',
    title: 'DCF Valuation Calculator',
    description:
      'Estimate the intrinsic value of a company using a Discounted Cash Flow (DCF) model with customizable assumptions such as revenue growth, discount rate, and terminal growth.',
    phase: 2,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('dcf-calculator'),
  },
  {
    id: 'india-economy-dashboard',
    slug: 'india-economy-dashboard',
    title: 'India Economy Dashboard',
    description:
      "An interactive dashboard tracking India's key macroeconomic indicators, including GDP, Inflation, Repo Rate, Unemployment, Fiscal Deficit, Exchange Rates, and Foreign Exchange Reserves.",
    phase: 3,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('india-economy-dashboard'),
  },
  {
    id: 'risk-analytics',
    slug: 'risk-analytics',
    title: 'Risk Analytics Dashboard',
    description:
      'Analyze any stock or portfolio using important financial risk metrics such as Beta, Sharpe Ratio, Sortino Ratio, Maximum Drawdown, and Volatility.',
    phase: 3,
    icon: 'risk',
    status: 'available',
    href: ROUTES.LABS_TOOL('risk-analytics'),
  },
  {
    id: 'ipo-performance-analyzer',
    slug: 'ipo-performance-analyzer',
    title: 'IPO Performance Analyzer',
    description:
      'Track issue price, listing gains, and 1-month/6-month/1-year returns across major Indian IPOs, with a sector-by-sector performance breakdown computed from real listing data.',
    phase: 5,
    icon: 'index',
    status: 'available',
    href: ROUTES.LABS_TOOL('ipo-performance-analyzer'),
  },
  {
    id: 'portfolio-backtesting-tool',
    slug: 'portfolio-backtesting-tool',
    title: 'Portfolio Backtesting Tool',
    description:
      'Backtest Index, Momentum, Value, and Growth strategies against historical annual returns and compare CAGR, Sharpe ratio, maximum drawdown, and total return.',
    phase: 5,
    icon: 'pie',
    status: 'available',
    href: ROUTES.LABS_TOOL('portfolio-backtesting-tool'),
  },
  {
    id: 'interest-rate-impact-model',
    slug: 'interest-rate-impact-model',
    title: 'Interest Rate Impact Model',
    description:
      'Analyze how RBI repo rate cycles correlate with returns across small-cap, financial, and technology stocks using real regression and correlation analysis.',
    phase: 5,
    icon: 'risk',
    status: 'available',
    href: ROUTES.LABS_TOOL('interest-rate-impact-model'),
  },
  {
    id: 'capital-intelligence-index',
    slug: 'capital-intelligence-index',
    title: 'MacroSpark Capital Intelligence Index',
    description:
      'A proprietary monthly index that analyzes market trends, sectors, macroeconomic indicators, and investment opportunities using data-driven scoring models.',
    phase: 4,
    icon: 'index',
    status: 'coming-soon',
    href: null,
  },
  {
    id: 'economic-data-library',
    slug: 'economic-data-library',
    title: 'Economic Data Library',
    description:
      'A free collection of clean and downloadable economic datasets covering GDP, Inflation, Interest Rates, Employment, Government Finance, Financial Markets, and other macroeconomic indicators for students, researchers, and developers.',
    phase: 4,
    icon: 'library',
    status: 'coming-soon',
    href: null,
  },
]
