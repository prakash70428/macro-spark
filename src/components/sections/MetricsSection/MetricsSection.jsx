'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import FadeIn from '@/components/animation/FadeIn'
import StaggerList, { StaggerItem } from '@/components/animation/StaggerList'
import styles from './MetricsSection.module.scss'

const METRICS = [
  { value: 500, suffix: '+', label: 'Research articles', sub: 'Published this year' },
  { value: 50, suffix: '+', label: 'Expert analysts', sub: 'Across 12 disciplines' },
  { value: 90, suffix: '+', label: 'Countries covered', sub: 'Macro & market data' },
  { value: 2, suffix: 'M+', label: 'Data points tracked', sub: 'Updated daily' },
]

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, target])

  return (
    <span ref={ref} className={styles.value} aria-label={`${target}${suffix}`}>
      <span>{count}</span>
      {suffix}
    </span>
  )
}

export default function MetricsSection() {
  return (
    <section className={styles.section} aria-labelledby="metrics-heading">
      <FadeIn direction="up">
        <div className={styles.header}>
          <span className={styles.eyebrow}>By the numbers</span>
          <h2 id="metrics-heading" className={styles.heading}>
            Trusted by professionals who move markets
          </h2>
        </div>
      </FadeIn>

      <StaggerList as="div" className={styles.grid} stagger={0.1}>
        {METRICS.map((m) => (
          <StaggerItem key={m.label}>
            <div className={styles.card}>
              <AnimatedNumber target={m.value} suffix={m.suffix} />
              <span className={styles.label}>{m.label}</span>
              <span className={styles.sub}>{m.sub}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerList>

      <FadeIn direction="up" delay={0.3}>
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>
            &ldquo;MacroSpark is the only platform that combines the editorial depth of a financial
            newspaper with the data fidelity of a terminal.&rdquo;
          </p>
          <cite className={styles.quoteAuthor}>— Portfolio Manager, Global Macro Fund</cite>
        </blockquote>
      </FadeIn>
    </section>
  )
}
