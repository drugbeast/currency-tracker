import styles from './ErrorFallback.module.scss'

function ErrorFallback({ error }) {
  return <span className={styles.message}>{error.message}</span>
}

export default ErrorFallback
