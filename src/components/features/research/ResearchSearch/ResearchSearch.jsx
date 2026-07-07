'use client'

import { useCallback, useTransition, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import styles from './ResearchSearch.module.scss'

export default function ResearchSearch({ defaultValue = '' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  // useRef so the timer reference persists across renders (fixes memory leak)
  const debounceTimer = useRef(null)
  // useRef for the input so we can call .focus() without touching the DOM directly
  const inputRef = useRef(null)

  const updateSearch = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      params.delete('page')
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams]
  )

  function handleChange(e) {
    clearTimeout(debounceTimer.current)
    const value = e.target.value
    debounceTimer.current = setTimeout(() => updateSearch(value), 300)
  }

  function handleClear() {
    clearTimeout(debounceTimer.current)
    updateSearch('')
    inputRef.current?.focus()
  }

  const hasValue = !!searchParams.get('q')

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        ⌕
      </span>
      <input
        ref={inputRef}
        id="research-search"
        type="search"
        className={styles.input}
        placeholder="Search research, topics, analysts…"
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-label="Search research articles"
        autoComplete="off"
      />
      {hasValue && (
        <button
          className={styles.clear}
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}
