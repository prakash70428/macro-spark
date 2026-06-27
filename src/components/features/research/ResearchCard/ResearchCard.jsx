import Link from 'next/link'
import clsx from 'clsx'
import styles from './ResearchCard.module.scss'

/**
 * @param {{ article: import('@/lib/research').Article, featured?: boolean }} props
 */
export default function ResearchCard({ article, featured = false }) {
  return (
    <Link
      href={`/analysis/${article.slug}`}
      className={clsx(styles.card, featured && styles.featured)}
    >
      <div className={styles.topRow}>
        <span className={styles.tag}>{article.tag}</span>
        <span className={styles.typeBadge}>{article.type.replace('-', ' ')}</span>
      </div>

      <h3 className={styles.headline}>{article.title}</h3>
      <p className={styles.excerpt}>{article.excerpt}</p>

      <div className={styles.footer}>
        <div className={styles.author}>
          <span className={styles.authorName}>{article.author.name}</span>
          <span className={styles.authorRole}>{article.author.role}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.readTime}>{article.readTime} read</span>
          <time className={styles.date} dateTime={new Date(article.date).toISOString().split('T')[0]}>{article.date}</time>
        </div>
      </div>
    </Link>
  )
}
