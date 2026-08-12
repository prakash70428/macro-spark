/**
 * IPO PERFORMANCE ANALYZER — DATASET
 * ─────────────────────────────────────────────────────────────────────────────
 * Static dataset of major Indian mainboard IPOs (NSE/BSE), compiled from public
 * listing-day records as of Aug 2026. Not a live feed — this page does not call
 * a market data API. Issue price and listing-day price are sourced from public
 * exchange/press records; 1-month, 6-month, and 1-year prices are period-end
 * approximations compiled from public price history, intended to demonstrate
 * real return/CAGR methodology rather than serve as tick-precise historical data.
 *
 * All returns shown on the page (listing gain, 1mo/6mo/1yr return, sector
 * averages) are computed at runtime from the prices below via src/lib/finance.js
 * — nothing here is a pre-baked percentage.
 */

export const SECTORS = [
  'Consumer Internet',
  'Fintech',
  'Financial Services',
  'Pharma & Healthcare',
  'Auto & EV',
  'Auto Components',
  'Consumer & Retail',
  'Technology & Engineering',
  'Logistics & Tech',
]

/**
 * @typedef {Object} IPO
 * @property {string} id
 * @property {string} company
 * @property {string} sector
 * @property {string} listingDate  ISO date string
 * @property {number} issuePrice   ₹ per share
 * @property {number} listingPrice ₹ per share, listing-day close
 * @property {number} price1m
 * @property {number} price6m
 * @property {number} price1y
 */

/** @type {IPO[]} */
export const IPOS = [
  {
    id: 'zomato',
    company: 'Zomato',
    sector: 'Consumer Internet',
    listingDate: '2021-07-23',
    issuePrice: 76,
    listingPrice: 126,
    price1m: 72,
    price6m: 62,
    price1y: 48,
  },
  {
    id: 'nykaa',
    company: 'FSN E-Commerce (Nykaa)',
    sector: 'Consumer Internet',
    listingDate: '2021-11-10',
    issuePrice: 1125,
    listingPrice: 2018,
    price1m: 1850,
    price6m: 1550,
    price1y: 1000,
  },
  {
    id: 'paytm',
    company: 'One97 Communications (Paytm)',
    sector: 'Fintech',
    listingDate: '2021-11-18',
    issuePrice: 2150,
    listingPrice: 1560,
    price1m: 1350,
    price6m: 700,
    price1y: 550,
  },
  {
    id: 'lic',
    company: 'Life Insurance Corporation (LIC)',
    sector: 'Financial Services',
    listingDate: '2022-05-17',
    issuePrice: 949,
    listingPrice: 873,
    price1m: 800,
    price6m: 630,
    price1y: 600,
  },
  {
    id: 'mankind-pharma',
    company: 'Mankind Pharma',
    sector: 'Pharma & Healthcare',
    listingDate: '2023-05-09',
    issuePrice: 1080,
    listingPrice: 1300,
    price1m: 1350,
    price6m: 1650,
    price1y: 2000,
  },
  {
    id: 'bajaj-housing-finance',
    company: 'Bajaj Housing Finance',
    sector: 'Financial Services',
    listingDate: '2024-09-16',
    issuePrice: 70,
    listingPrice: 150,
    price1m: 155,
    price6m: 130,
    price1y: 145,
  },
  {
    id: 'swiggy',
    company: 'Swiggy',
    sector: 'Consumer Internet',
    listingDate: '2024-11-13',
    issuePrice: 390,
    listingPrice: 420,
    price1m: 380,
    price6m: 340,
    price1y: 420,
  },
  {
    id: 'tata-technologies',
    company: 'Tata Technologies',
    sector: 'Technology & Engineering',
    listingDate: '2023-11-30',
    issuePrice: 500,
    listingPrice: 1200,
    price1m: 1050,
    price6m: 950,
    price1y: 800,
  },
  {
    id: 'hyundai-motor-india',
    company: 'Hyundai Motor India',
    sector: 'Auto & EV',
    listingDate: '2024-10-22',
    issuePrice: 1960,
    listingPrice: 1834,
    price1m: 1700,
    price6m: 1600,
    price1y: 1750,
  },
  {
    id: 'delhivery',
    company: 'Delhivery',
    sector: 'Logistics & Tech',
    listingDate: '2022-05-24',
    issuePrice: 487,
    listingPrice: 495,
    price1m: 430,
    price6m: 350,
    price1y: 380,
  },
  {
    id: 'star-health',
    company: 'Star Health & Allied Insurance',
    sector: 'Financial Services',
    listingDate: '2021-12-10',
    issuePrice: 900,
    listingPrice: 778,
    price1m: 720,
    price6m: 620,
    price1y: 580,
  },
  {
    id: 'sona-comstar',
    company: 'Sona BLW Precision Forgings (Sona Comstar)',
    sector: 'Auto Components',
    listingDate: '2021-06-24',
    issuePrice: 291,
    listingPrice: 301,
    price1m: 310,
    price6m: 400,
    price1y: 480,
  },
  {
    id: 'devyani-international',
    company: 'Devyani International',
    sector: 'Consumer & Retail',
    listingDate: '2021-08-16',
    issuePrice: 90,
    listingPrice: 138,
    price1m: 150,
    price6m: 180,
    price1y: 190,
  },
  {
    id: 'metro-brands',
    company: 'Metro Brands',
    sector: 'Consumer & Retail',
    listingDate: '2021-12-10',
    issuePrice: 500,
    listingPrice: 515,
    price1m: 520,
    price6m: 600,
    price1y: 750,
  },
  {
    id: 'ola-electric',
    company: 'Ola Electric Mobility',
    sector: 'Auto & EV',
    listingDate: '2024-08-09',
    issuePrice: 76,
    listingPrice: 82,
    price1m: 110,
    price6m: 70,
    price1y: 45,
  },
  {
    id: 'ireda',
    company: 'Indian Renewable Energy Development Agency (IREDA)',
    sector: 'Financial Services',
    listingDate: '2023-11-29',
    issuePrice: 32,
    listingPrice: 50,
    price1m: 110,
    price6m: 180,
    price1y: 220,
  },
  {
    id: 'concord-biotech',
    company: 'Concord Biotech',
    sector: 'Pharma & Healthcare',
    listingDate: '2023-08-18',
    issuePrice: 741,
    listingPrice: 900,
    price1m: 950,
    price6m: 1250,
    price1y: 1500,
  },
  {
    id: 'kfin-technologies',
    company: 'KFin Technologies',
    sector: 'Financial Services',
    listingDate: '2022-12-29',
    issuePrice: 366,
    listingPrice: 379,
    price1m: 400,
    price6m: 480,
    price1y: 600,
  },
]
