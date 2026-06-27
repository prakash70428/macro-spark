/**
 * ─── QUANT PROJECTS DATA ──────────────────────────────────────────────────────
 *
 * Naya project add karna ho toh do kaam karo:
 *
 *  STEP 1 — .py file yahan daalo:
 *            macro_spark/public/quant/<file-name>.py
 *
 *  STEP 2 — Neeche PROJECTS array mein ek object add karo:
 *
 *  {
 *    id:          'unique-id',           // koi bhi unique string, URL-safe
 *    title:       'Project ka naam',
 *    description: 'Kya karta hai ye project (2-3 lines)',
 *    category:    'Backtesting',         // CATEGORIES list mein se koi ek
 *    tags:        ['pandas', 'numpy'],   // libraries/tools used (optional)
 *    file:        '/quant/file-name.py', // public/quant/ ke andr wali file
 *    fileName:    'file-name.py',        // download button pe dikhega
 *  },
 *
 * Project delete karna ho toh bas us object ko array se hata do.
 * Naya category banana ho toh CATEGORIES array mein bhi daal do.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PROJECTS = [
  {
    id:          'project-1',
    title:       'Project 1',
    description: 'Client will provide the project description and .py file.',
    category:    'Other',
    tags:        [],
    file:        '/quant/project-1.py',
    fileName:    'project-1.py',
  },
  {
    id:          'project-2',
    title:       'Project 2',
    description: 'Client will provide the project description and .py file.',
    category:    'Other',
    tags:        [],
    file:        '/quant/project-2.py',
    fileName:    'project-2.py',
  },
  {
    id:          'project-3',
    title:       'Project 3',
    description: 'Client will provide the project description and .py file.',
    category:    'Other',
    tags:        [],
    file:        '/quant/project-3.py',
    fileName:    'project-3.py',
  },
]

export const CATEGORIES = [
  'All',
  'Backtesting',
  'Factor Models',
  'Risk Management',
  'Portfolio Optimisation',
  'Macro Signals',
  'Options & Derivatives',
  'Other',
]
