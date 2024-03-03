import styles from './ErrorFallback.module.scss'

function ErrorFallback({ message, resetError }) {
  return (
    <section className={styles.section}>
      <span className={styles.message}>{message}</span>
      {message ===
        'Oops... Negative Number! Please, remove the "-" sign and click "reset".' && (
        <button type="button" onClick={resetError} className={styles.reset}>
          reset
        </button>
      )}
    </section>
  )
}

export default ErrorFallback
