'use client'

import { useRef, useState } from 'react'
import styles from './UploadDropzone.module.scss'

/**
 * Drag-and-drop file picker UI. Does not upload anything — Labs tools are
 * UI/UX-only mocks for now, so this just tracks the selected file's name
 * client-side and reports it via onFileSelect.
 *
 * @param {Object} props
 * @param {string} [props.accept] - e.g. ".pdf,.xlsx,.csv"
 * @param {string} [props.hint] - helper text under the label
 * @param {(file: File | null) => void} [props.onFileSelect]
 */
export default function UploadDropzone({
  accept = '.pdf,.xlsx,.csv',
  hint = 'PDF, Excel or CSV — up to 20MB',
  onFileSelect,
}) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(fileList) {
    const file = fileList?.[0] ?? null
    setFileName(file ? file.name : null)
    onFileSelect?.(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleClear(e) {
    e.stopPropagation()
    setFileName(null)
    onFileSelect?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div
      className={isDragging ? `${styles.dropzone} ${styles.dropzoneActive}` : styles.dropzone}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload file"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={styles.input}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-interactive-primary)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>

      {fileName ? (
        <div className={styles.fileRow}>
          <span className={styles.fileName}>{fileName}</span>
          <button type="button" className={styles.clearBtn} onClick={handleClear}>
            Remove
          </button>
        </div>
      ) : (
        <>
          <p className={styles.label}>
            <span className={styles.labelStrong}>Click to upload</span> or drag and drop
          </p>
          <p className={styles.hint}>{hint}</p>
        </>
      )}
    </div>
  )
}
