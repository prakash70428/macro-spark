'use client'

import styles from './LabInputGroup.module.scss'

/**
 * Labeled segmented control — e.g. risk tolerance Low/Medium/High.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string[]} props.options
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 */
export function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div className={styles.field}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.segmented} role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={
              value === option ? `${styles.segment} ${styles.segmentActive}` : styles.segment
            }
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Labeled range slider with live value readout.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {number} props.value
 * @param {(value: number) => void} props.onChange
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {string} [props.unit='']
 */
export function SliderField({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) {
  return (
    <div className={styles.field}>
      <div className={styles.sliderHeader}>
        <p className={styles.label}>{label}</p>
        <span className={styles.sliderValue}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  )
}

/**
 * Labeled numeric input.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {number | string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.unit]
 */
export function NumberField({ label, value, onChange, placeholder, unit, ...rest }) {
  return (
    <div className={styles.field}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.numberWrap}>
        <input
          type="number"
          className={styles.numberInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          {...rest}
        />
        {unit && <span className={styles.numberUnit}>{unit}</span>}
      </div>
    </div>
  )
}

/**
 * Labeled free-text input — e.g. a ticker symbol.
 */
export function TextField({ label, value, onChange, placeholder, ...rest }) {
  return (
    <div className={styles.field}>
      {label && <p className={styles.label}>{label}</p>}
      <input
        type="text"
        className={styles.textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        {...rest}
      />
    </div>
  )
}
