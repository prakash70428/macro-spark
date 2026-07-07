/**
 * Design system JS constants — mirror of the SCSS token system.
 * Use in JS contexts: chart config, canvas rendering, dynamic styles.
 * For CSS/SCSS, always use the CSS custom properties directly.
 */

export const COLORS = {
  interactive: 'var(--color-interactive-primary)',
  textPrimary: 'var(--color-text-primary)',
  textSecond: 'var(--color-text-secondary)',
  positive: 'var(--color-market-positive)',
  negative: 'var(--color-market-negative)',
  chart: [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)',
    'var(--color-chart-6)',
  ],
}

export const FONT_FAMILIES = {
  editorial: 'var(--font-editorial)',
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
}

export const DURATION = {
  instant: 80,
  fast: 150,
  normal: 250,
  slow: 400,
  deliberate: 600,
}

// Framer Motion easing arrays
export const EASING = {
  outSmooth: [0.16, 1, 0.3, 1],
  inSmooth: [0.7, 0, 0.84, 0],
  editorial: [0.25, 0.46, 0.45, 0.94],
}

export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
}
