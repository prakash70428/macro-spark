'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import { ARTICLES, CATEGORIES } from './data'
import styles from './page.module.scss'

export default function ArticlesPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === active)

  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Articles</span>
              <h1 className={styles.heading}>In-Depth Articles</h1>
              <p className={styles.sub}>
                Long-form articles on finance and economics. Each piece is available to read and
                download as a PDF.
              </p>
            </div>
          </FadeIn>

          {/* Category filter */}
          <FadeIn direction="up" delay={0.08}>
            <div className={styles.categories} role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={active === cat ? `${styles.chip} ${styles.chipActive}` : styles.chip}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Articles list */}
          {filtered.length > 0 ? (
            <div className={styles.list}>
              {filtered.map((article) => (
                <div key={article.pdf} className={styles.card}>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.metaText}>{article.date}</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.metaText}>{article.pages} pages</span>
                  </div>

                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>

                  <div className={styles.cardActions}>
                    <a
                      href={article.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnPdf}
                      aria-label={`Download PDF: ${article.title}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No articles in this category yet.</p>
            </div>
          )}
        </Container>
      </div>
    </PageLayout>
  )
}
