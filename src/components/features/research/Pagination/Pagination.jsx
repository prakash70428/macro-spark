import Link from 'next/link'
import clsx from 'clsx'
import styles from './Pagination.module.scss'

/**
 * Server Component — builds page links from current URL search params.
 *
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   total: number,
 *   searchParams: Record<string, string>
 * }} props
 */
export default function Pagination({ page, totalPages, total, searchParams }) {
  if (totalPages <= 1) return null

  function buildHref(targetPage) {
    const params = new URLSearchParams(searchParams)
    if (targetPage === 1) {
      params.delete('page')
    } else {
      params.set('page', String(targetPage))
    }
    const qs = params.toString()
    return `/analysis${qs ? `?${qs}` : ''}`
  }

  // Visible page numbers — always show first, last, current ±1
  function getPageNumbers() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages))
    const sorted = [...pages].sort((a, b) => a - b)

    const result = []
    let prev = null
    for (const p of sorted) {
      if (prev !== null && p - prev > 1) result.push('…')
      result.push(p)
      prev = p
    }
    return result
  }

  return (
    <nav aria-label="Research pagination">
      <div className={styles.wrapper}>
        {/* Prev */}
        {page > 1 ? (
          <Link href={buildHref(page - 1)} className={styles.btn} aria-label="Previous page">
            ←
          </Link>
        ) : (
          <span className={clsx(styles.btn, styles.disabled)} aria-hidden="true">←</span>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              className={clsx(styles.btn, p === page && styles.active)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        {page < totalPages ? (
          <Link href={buildHref(page + 1)} className={styles.btn} aria-label="Next page">
            →
          </Link>
        ) : (
          <span className={clsx(styles.btn, styles.disabled)} aria-hidden="true">→</span>
        )}
      </div>

      <p className={styles.info}>
        Page {page} of {totalPages} · {total} articles
      </p>
    </nav>
  )
}
