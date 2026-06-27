import Link from 'next/link'
import Button from '@/components/ui/Button/Button'
import SidebarNewsletter from './SidebarNewsletter'
import styles from './ArticleSidebar.module.scss'

/**
 * @param {{ related: import('@/lib/research').Article[] }} props
 */
export default function ArticleSidebar({ related }) {
  return (
    <aside className={`${styles.sidebar} ${styles.sticky}`} aria-label="Article sidebar">
      {/* Related articles */}
      {related.length > 0 && (
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>Related Research</h2>
          <ul className={styles.relatedList} role="list">
            {related.map((article, i) => (
              <li key={article.id} className={styles.relatedItem}>
                <span className={styles.relatedTag}>{article.tag}</span>
                <Link href={`/analysis/${article.slug}`} className={styles.relatedLink}>
                  {article.title}
                </Link>
                <span className={styles.relatedMeta}>
                  {article.author.name} · {article.readTime} · {article.date}
                </span>
                {i < related.length - 1 && <hr className={styles.relatedDivider} />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter */}
      <div className={`${styles.widget} ${styles.newsletterWidget}`}>
        <h2 className={styles.nlHeading}>Get the weekly briefing</h2>
        <p className={styles.nlBody}>
          Join 40,000+ readers. Every Sunday — signal over noise.
        </p>
        <SidebarNewsletter />
      </div>
    </aside>
  )
}
