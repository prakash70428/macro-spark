'use client'

import { useState } from 'react'
import LabToolLayout from '@/components/features/labs/LabToolLayout'
import UploadDropzone from '@/components/features/labs/UploadDropzone'
import Button from '@/components/ui/Button/Button'
import { LABS_TOOLS } from '../data'
import styles from './page.module.scss'

const TOOL = LABS_TOOLS.find((t) => t.id === 'statement-explainer')

const STATEMENT_TYPES = ['Balance Sheet', 'Income Statement', 'Cash Flow Statement']

const MOCK_SECTIONS = [
  {
    title: 'Financial Health Summary',
    body: 'Sample output — a plain-language summary of what this statement says about the company’s overall financial health, written for a non-specialist reader.',
  },
  {
    title: 'Strengths',
    body: 'Sample output — the positive signals found in the statement, such as healthy liquidity, strong margins, or manageable debt levels.',
  },
  {
    title: 'Concerns',
    body: 'Sample output — the areas that warrant a closer look, such as declining cash reserves or rising liabilities.',
  },
  {
    title: 'Bottom Line',
    body: 'Sample output — a one-paragraph takeaway on what this statement means for the company’s near-term financial position.',
  },
]

export default function StatementExplainerPage() {
  const [statementType, setStatementType] = useState(STATEMENT_TYPES[0])
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | explaining | done

  function handleExplain() {
    if (!file) return
    setStatus('explaining')
    setTimeout(() => setStatus('done'), 1200)
  }

  function handleReset() {
    setFile(null)
    setStatus('idle')
  }

  return (
    <LabToolLayout title={TOOL.title} description={TOOL.description}>
      <div className={styles.panel}>
        <div>
          <p className={styles.fieldLabel}>Statement type</p>
          <div className={styles.typeChips} role="group" aria-label="Statement type">
            {STATEMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setStatementType(type)}
                className={
                  statementType === type ? `${styles.chip} ${styles.chipActive}` : styles.chip
                }
                aria-pressed={statementType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <UploadDropzone
          accept=".pdf,.xlsx,.csv"
          hint={`Upload the ${statementType} — PDF, Excel or CSV`}
          onFileSelect={(f) => {
            setFile(f)
            setStatus('idle')
          }}
        />

        <div className={styles.actions}>
          <Button
            variant="primary"
            disabled={!file}
            loading={status === 'explaining'}
            onClick={handleExplain}
          >
            Explain Statement
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
