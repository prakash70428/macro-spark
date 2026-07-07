'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import { BLOGS, CATEGORIES } from './data'
import styles from './page.module.scss'

export default function BlogsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? BLOGS : BLOGS.filter((b) => b.category === active)

  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark Blogs</span>
              <h1 className={styles.heading}>Market Commentary &amp; Opinion</h1>
              <p className={styles.sub}>
                Macro perspectives, market commentary, and opinion pieces — written with data and
                without an agenda.
              </p>
            </div>
          </FadeIn>

          {/* Category filter chips */}
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

          {/* Blog grid */}
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.category}>{blog.category}</span>
                    <span className={styles.readTime}>{blog.readTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{blog.title}</h2>
                  <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.date}>{blog.date}</span>
                    <span className={styles.readMore}>Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No blogs in this category yet.</p>
            </div>
          )}
        </Container>
      </div>
    </PageLayout>
  )
}
