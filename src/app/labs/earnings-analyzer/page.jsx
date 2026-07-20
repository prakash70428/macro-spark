'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import UploadDropzone from '@/components/features/labs/UploadDropzone'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'earnings-analyzer')

const MOCK_SECTIONS = [
  {
    title: 'Business Overview',
    body: 'Sample output — once connected, this section will summarize the company’s core business segments, market position, and recent strategic developments drawn from the uploaded report.',
  },
  {
    title: 'Financial Performance',
    body: 'Sample output — revenue, margin, and profitability trends over the reporting period, highlighted against prior-year comparisons.',
  },
  {
    title: 'Risks',
    body: 'Sample output — key risk factors disclosed in the report, such as regulatory, competitive, or operational exposures.',
  },
  {
    title: 'Opportunities',
    body: 'Sample output — growth drivers and opportunities identified from management commentary and forward-looking statements.',
  },
  {
    title: 'Key Ratios',
    body: 'Sample output — P/E, ROE, debt-to-equity, and other key ratios computed from the statements, with brief context.',
  },
  {
    title: 'Investment Insights',
    body: 'Sample output — a synthesized take on whether the report signals strength or caution for investors, in plain language.',
  },
]

export default function EarningsAnalyzerPage() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | analyzing | done

  function handleAnalyze() {
    if (!file) return
    setStatus('analyzing')
    setTimeout(() => setStatus('done'), 1200)
  }

  function handleReset() {
    setFile(null)
    setStatus('idle')
  }

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <UploadDropzone
          accept=".pdf,.xlsx,.csv"
          hint="Annual report or financial statements — PDF, Excel or CSV"
          onFileSelect={(f) => {
            setFile(f)
            setStatus('idle')
          }}
        />

        <div className={styles.actions}>
          <Button
            variant="primary"
            disabled={!file}
            loading={status === 'analyzing'}
            onClick={handleAnalyze}
          >
            Analyze Report
          </Button>
          {status === 'done' && (
            <Button variant="ghost" onClick={handleReset}>
              Start over
            </Button>
          )}
        </div>

        <p className={styles.note}>
          This is a UI preview — no file is uploaded or analyzed yet. Output below is sample text.
        </p>
      </div>

      {status === 'done' && (
        <div className={styles.results}>
          {MOCK_SECTIONS.map((section) => (
            <div className={styles.resultCard} key={section.title}>
              <h2 className={styles.resultTitle}>{section.title}</h2>
              <p className={styles.resultBody}>{section.body}</p>
            </div>
          ))}
        </div>
      )}
    </LabToolLayout>
  )
}
