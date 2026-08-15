import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
import LineChart from '@/components/features/labs/charts/LineChart'
import { BLOGS } from '../data'
import styles from './page.module.scss'

export function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }))
}

export function generateMetadata({ params }) {
  const blog = BLOGS.find((b) => b.slug === params.slug)
  if (!blog) return {}
  return {
    title: blog.title,
    description: blog.excerpt,
  }
}

function BlogBody({ body, excerpt }) {
  if (!body || body.length === 0) {
    return (
      <div className={styles.body}>
        <p>{excerpt}</p>
      </div>
    )
  }

  return (
    <div className={styles.body}>
      {body.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 className={styles.h2} key={i}>
                {block.text}
              </h2>
            )
          case 'list':
            return (
              <ul className={styles.list} key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote className={styles.quote} key={i}>
                {block.text}
              </blockquote>
            )
          case 'chart':
            return (
              <figure className={styles.chartFigure} key={i}>
                <LineChart
                  ariaLabel={block.title}
                  xLabels={block.xLabels}
                  series={block.series}
                  yFormat={block.yFormat}
                />
                <figcaption className={styles.chartCaption}>{block.title}</figcaption>
              </figure>
            )
          case 'paragraph':
          default:
            return <p key={i}>{block.text}</p>
        }
      })}
    </div>
  )
}

export default function BlogPostPage({ params }) {
  const blog = BLOGS.find((b) => b.slug === params.slug)
  if (!blog) notFound()

  return (
    <PageLayout>
      <div className={styles.page}>
        <Container>
          <FadeIn direction="up">
            <article className={styles.article}>
              <Link href="/blogs" className={styles.back}>
                ← Blogs
              </Link>

              <div className={styles.topRow}>
                <span className={styles.category}>{blog.category}</span>
                <span className={styles.readTime}>{blog.readTime}</span>
              </div>

              <h1 className={styles.headline}>{blog.title}</h1>

              <time className={styles.date} dateTime={blog.date}>
                {blog.date}
              </time>

              <BlogBody body={blog.body} excerpt={blog.excerpt} />
            </article>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
