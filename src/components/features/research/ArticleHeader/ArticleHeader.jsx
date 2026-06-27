import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import styles from './ArticleHeader.module.scss'

/**
 * @param {{ article: import('@/lib/research').Article }} props
 */
export default function ArticleHeader({ article }) {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link href={ROUTES.ARTICLES} className={styles.back}>
          ← Analysis
        </Link>
        <span className={styles.tag}>{article.tag}</span>
        <span className={styles.typeBadge}>{article.type.replace('-', ' ')}</span>
      </div>

      <h1 className={styles.headline}>{article.title}</h1>
      <p className={styles.excerpt}>{article.excerpt}</p>

      <div className={styles.meta}>
        <div className={styles.author}>
          <span className={styles.authorName}>{article.author.name}</span>
          <span className={styles.authorRole}>{article.author.role}</span>
        </div>
        <div className={styles.metaDivider} aria-hidden="true" />
        <div className={styles.metaGroup}>
          <span className={styles.metaLabel}>Published</span>
          <time className={styles.metaValue} dateTime={article.date}>{article.date}</time>
        </div>
        <div className={styles.metaDivider} aria-hidden="true" />
        <div className={styles.metaGroup}>
          <span className={styles.metaLabel}>Read time</span>
          <span className={styles.metaValue}>{article.readTime}</span>
        </div>
      </div>
    </header>
  )
}
