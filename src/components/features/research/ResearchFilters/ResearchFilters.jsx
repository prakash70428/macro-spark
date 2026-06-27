'use client'

import { useCallback, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { CATEGORIES, CONTENT_TYPES, SORT_OPTIONS } from '@/lib/research'
import styles from './ResearchFilters.module.scss'

/**
 * @param {{ total: number }} props
 */
export default function ResearchFilters({ total }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const activeCategory = searchParams.get('category') || 'all'
  const activeType     = searchParams.get('type')     || 'all'
  const activeSort     = searchParams.get('sort')     || 'latest'

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all' || !value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete('page')
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams]
  )

  function clearAll() {
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }

  const hasActiveFilters =
    activeCategory !== 'all' || activeType !== 'all' || activeSort !== 'latest'

  return (
    <div>
      {/* Category chips */}
      <div className={styles.chips} role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={clsx(styles.chip, activeCategory === cat.value && styles.active)}
            onClick={() => updateParam('category', cat.value)}
            aria-pressed={activeCategory === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Type select + sort + count */}
      <div className={styles.wrapper} style={{ marginTop: 'var(--space-4)' }}>
        <div className={styles.group}>
          <label htmlFor="filter-type" className={styles.groupLabel}>Type</label>
          <select
            id="filter-type"
            className={styles.select}
            value={activeType}
            onChange={(e) => updateParam('type', e.target.value)}
            aria-label="Filter by content type"
          >
            {CONTENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="filter-sort" className={styles.groupLabel}>Sort</label>
          <select
            id="filter-sort"
            className={styles.select}
            value={activeSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            aria-label="Sort articles"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <span className={styles.resultCount} aria-live="polite">
          {total} {total === 1 ? 'article' : 'articles'}
        </span>

        {hasActiveFilters && (
          <button className={styles.clearAll} onClick={clearAll} type="button">
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}
