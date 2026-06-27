import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from './PageLayout.module.scss'

/**
 * Standard page shell: fixed Navbar + flexible content area + Footer.
 * Wrap every public page with this.
 *
 * @param {{ children: React.ReactNode, hideFooter?: boolean }} props
 *
 * @example
 * // In a page.jsx:
 * export default function MarketsPage() {
 *   return (
 *     <PageLayout>
 *       <section>...</section>
 *     </PageLayout>
 *   )
 * }
 */
export default function PageLayout({ children, hideFooter = false }) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main} id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}
