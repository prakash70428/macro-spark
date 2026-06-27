import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './Card.module.scss'

/**
 * Editorial article card.
 *
 * @param {{
 *   title: string,
 *   excerpt?: string,
 *   tag?: string,
 *   readTime?: string,
 *   thumbnail?: string,
 *   author?: { name: string, avatar?: string },
 *   date?: string,
 *   href: string,
 *   className?: string,
 * }} props
 */
export default function ArticleCard({
  title,
  excerpt,
  tag,
  readTime,
  thumbnail,
  author,
  date,
  href,
  className,
}) {
  return (
    <Link href={href} className={clsx(styles.card, styles.articleCard, styles.interactive, className)}>
      {thumbnail && (
        <div className={styles.thumbnail}>
          <Image src={thumbnail} alt={title} fill sizes="(max-width: 768px) 100vw, 400px" />
        </div>
      )}

      <div className={styles.meta}>
        {tag && <span className={styles.tag}>{tag}</span>}
        {readTime && <span className={styles.readTime}>{readTime}</span>}
      </div>

      <h3 className={styles.headline}>{title}</h3>

      {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

      {(author || date) && (
        <div className={styles.footer}>
          {author && (
            <div className={styles.author}>
              {author.avatar && (
                <div className={styles.authorAvatar}>
                  <Image src={author.avatar} alt={author.name} width={24} height={24} />
                </div>
              )}
              <span className={styles.authorName}>{author.name}</span>
            </div>
          )}
          {date && <time className={styles.date} dateTime={date}>{date}</time>}
        </div>
      )}
    </Link>
  )
}
