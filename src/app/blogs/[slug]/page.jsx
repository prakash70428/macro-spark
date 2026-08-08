import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import Container from '@/components/layout/Container/Container'
import FadeIn from '@/components/animation/FadeIn'
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

              <div className={styles.body}>
                <p>{blog.excerpt}</p>
              </div>
            </article>
          </FadeIn>
        </Container>
      </div>
    </PageLayout>
  )
}
