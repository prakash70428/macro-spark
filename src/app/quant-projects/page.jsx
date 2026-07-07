'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import { PROJECTS, CATEGORIES } from './data'
import styles from './page.module.scss'

function PythonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.5 2 8 3.5 8 5v2h4v1H5.5C3.5 8 2 9.5 2 12s1.5 4 3.5 4H7v-2.5c0-2 1-3 3-3h4c2 0 3-1 3-3V5c0-2-1.5-3-5-3zm-1 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        fill="var(--color-interactive-primary)"
        opacity="0.8"
      />
      <path
        d="M12 22c3.5 0 4-1.5 4-3v-2h-4v-1h6.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H17v2.5c0 2-1 3-3 3H10c-2 0-3 1-3 3v3c0 2 1.5 3 5 3zm1-2.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        fill="var(--color-interactive-primary)"
        opacity="0.5"
      />
    </svg>
  )
}

export default function QuantProjectsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>MacroSpark</span>
              <h1 className={styles.heading}>Quant Finance Projects</h1>
              <p className={styles.sub}>
                Quantitative finance projects built in Python. Each project includes full source
                code available for download.
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

          {/* Projects grid */}
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((project) => (
                <div key={project.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <PythonIcon />
                    </div>
                    <span className={styles.categoryBadge}>{project.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    {project.tags.length > 0 && (
                      <div className={styles.tags}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className={styles.desc}>{project.description}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.fileInfo}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                        <polyline points="13 2 13 9 20 9" />
                      </svg>
                      <span className={styles.fileName}>{project.fileName}</span>
                    </div>
                    <a
                      href={project.file}
                      download={project.fileName}
                      className={styles.btnDownload}
                      aria-label={`Download ${project.fileName}`}
                    >
                      <svg
                        width="14"
                        height="14"
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
                      Download .py
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No projects in this category yet.</p>
            </div>
          )}
        </Container>
      </div>
    </PageLayout>
  )
}
