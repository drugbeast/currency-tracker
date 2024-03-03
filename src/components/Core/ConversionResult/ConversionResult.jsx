import { ERROR_MESSAGE } from './ConversionResult.config'
import styles from './ConversionResult.module.scss'

function ConversionResult({ result, currency }) {
  if (result < 0) {
    throw new Error(ERROR_MESSAGE)
  }
  return (
    <span className={styles.result} data-cy="conversion-result">
      {result === 0 ? 0 : result.toFixed(currency === 'BTC' ? 8 : 3)} {currency}
    </span>
  )
}

export default ConversionResult
