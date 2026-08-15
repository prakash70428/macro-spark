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
    title: 'Earnings Analyzer',
    description:
      "Enter a company's current and prior-period revenue, profit, and EPS to get YoY growth, margin change, and rule-based flags on the earnings trend, computed live.",
    phase: 1,
    icon: 'document',
    status: 'available',
    href: ROUTES.LABS_TOOL('earnings-analyzer'),
  },
  {
    id: 'statement-explainer',
    slug: 'statement-explainer',
    title: 'Financial Statement Analyzer',
    description:
      "Enter a company's key balance sheet and income statement figures and get liquidity, leverage, and profitability ratios computed live, each with a plain-language interpretation.",
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
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description:
      'See how a lump sum grows over time with compound interest, with adjustable contribution frequency, rate, and time horizon.',
    phase: 6,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('compound-interest-calculator'),
  },
  {
    id: 'sip-calculator',
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    description:
      'Project the future value of a monthly Systematic Investment Plan (SIP) based on contribution amount, expected annual return, and investment duration.',
    phase: 6,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('sip-calculator'),
  },
  {
    id: 'loan-emi-calculator',
    slug: 'loan-emi-calculator',
    title: 'Loan / EMI Calculator',
    description:
      'Calculate the monthly EMI, total interest, and full amortization schedule for a loan given principal, interest rate, and tenure.',
    phase: 6,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('loan-emi-calculator'),
  },
  {
    id: 'inflation-calculator',
    slug: 'inflation-calculator',
    title: 'Inflation Calculator',
    description:
      "Convert a rupee amount between two years using compounding inflation rates to see how much purchasing power has changed.",
    phase: 6,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('inflation-calculator'),
  },
  {
    id: 'budget-planner',
    slug: 'budget-planner',
    title: 'Budget Planner',
    description:
      'Allocate monthly income across needs, wants, and savings, compare against the 50/30/20 rule, and see your monthly and annual surplus.',
    phase: 6,
    icon: 'pie',
    status: 'available',
    href: ROUTES.LABS_TOOL('budget-planner'),
  },
  {
    id: 'black-scholes-calculator',
    slug: 'black-scholes-calculator',
    title: 'Black-Scholes Option Pricing Calculator',
    description:
      'Price European call and put options using the Black-Scholes model from spot price, strike, volatility, risk-free rate, and time to expiry, with the full Greeks.',
    phase: 6,
    icon: 'calculator',
    status: 'available',
    href: ROUTES.LABS_TOOL('black-scholes-calculator'),
  },
  {
    id: 'monte-carlo-simulator',
    slug: 'monte-carlo-simulator',
    title: 'Monte Carlo Investment Simulator',
    description:
      'Run thousands of randomized market paths to see the distribution of possible portfolio outcomes given expected return, volatility, and time horizon.',
    phase: 6,
    icon: 'risk',
    status: 'available',
    href: ROUTES.LABS_TOOL('monte-carlo-simulator'),
  },
  {
    id: 'gdp-growth-simulator',
    slug: 'gdp-growth-simulator',
    title: 'GDP Growth Simulator',
    description:
      'Explore how consumption, investment, government spending, and net exports combine to drive GDP growth using the expenditure approach.',
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('gdp-growth-simulator'),
  },
  {
    id: 'fiscal-policy-simulator',
    slug: 'fiscal-policy-simulator',
    title: 'Fiscal Policy Simulator',
    description:
      'Adjust government spending and tax rates to see the effect on GDP through the fiscal multiplier, and the resulting impact on the fiscal deficit.',
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('fiscal-policy-simulator'),
  },
  {
    id: 'monetary-policy-simulator',
    slug: 'monetary-policy-simulator',
    title: 'Monetary Policy Simulator',
    description:
      "Adjust the central bank's repo rate and see the modeled effect on borrowing costs, inflation, and GDP growth through the monetary policy transmission mechanism.",
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('monetary-policy-simulator'),
  },
  {
    id: 'supply-demand-simulator',
    slug: 'supply-demand-simulator',
    title: 'Supply & Demand Simulator',
    description:
      'Shift linear supply and demand curves to see how the equilibrium price and quantity change, and how taxes or price controls create surplus or shortage.',
    phase: 6,
    icon: 'index',
    status: 'available',
    href: ROUTES.LABS_TOOL('supply-demand-simulator'),
  },
  {
    id: 'stock-market-simulator',
    slug: 'stock-market-simulator',
    title: 'Stock Market Simulator',
    description:
      'Trade a virtual portfolio against a simulated market that moves on randomized daily price action, and track your cash, holdings, and total return.',
    phase: 6,
    icon: 'index',
    status: 'available',
    href: ROUTES.LABS_TOOL('stock-market-simulator'),
  },
  {
    id: 'inflation-dashboard',
    slug: 'inflation-dashboard',
    title: 'Inflation Dashboard',
    description:
      "Track India's CPI and WPI inflation trends by category over time, with month-on-month and year-on-year change computed from the underlying series.",
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('inflation-dashboard'),
  },
  {
    id: 'gdp-dashboard',
    slug: 'gdp-dashboard',
    title: 'GDP Dashboard',
    description:
      "Explore India's quarterly GDP growth by sector — agriculture, industry, and services — with historical trend charts and computed contribution shares.",
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('gdp-dashboard'),
  },
  {
    id: 'employment-dashboard',
    slug: 'employment-dashboard',
    title: 'Employment Dashboard',
    description:
      "Track India's unemployment rate, labour force participation, and sectoral employment trends over time.",
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('employment-dashboard'),
  },
  {
    id: 'company-financial-dashboard',
    slug: 'company-financial-dashboard',
    title: 'Company Financial Dashboard',
    description:
      'Compare revenue, profit margins, and key ratios across companies using a sample financial dataset, with year-over-year trend charts.',
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('company-financial-dashboard'),
  },
  {
    id: 'live-market-dashboard',
    slug: 'live-market-dashboard',
    title: 'Live Market Dashboard',
    description:
      'A market-ticker style dashboard of major Indian indices and sectors with daily and weekly change computed from the underlying price series.',
    phase: 6,
    icon: 'dashboard',
    status: 'available',
    href: ROUTES.LABS_TOOL('live-market-dashboard'),
  },
  {
    id: 'startup-funding-tracker',
    slug: 'startup-funding-tracker',
    title: 'Startup Funding Tracker',
    description:
      'Browse and filter a dataset of Indian startup funding rounds by sector and stage, with aggregate totals computed live from your filters.',
    phase: 6,
    icon: 'index',
    status: 'available',
    href: ROUTES.LABS_TOOL('startup-funding-tracker'),
  },
  {
    id: 'economic-forecasting-model',
    slug: 'economic-forecasting-model',
    title: 'Economic Forecasting Model',
    description:
      'Project GDP growth or CPI inflation forward using a linear trend regression fitted to historical data, with an approximate confidence range computed from the residual error.',
    phase: 6,
    icon: 'index',
    status: 'available',
    href: ROUTES.LABS_TOOL('economic-forecasting-model'),
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
