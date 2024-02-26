import styles from './ConversionResult.module.scss'

function ConversionResult({ result, currency }) {
  if (result < 0) {
    throw new Error('Oops... Negative Number! Please, remove the "-" sign.')
  }
  return (
    <span className={styles.result}>
      {result === 0 ? 0 : result.toFixed(currency === 'BTC' ? 8 : 3)} {currency}
    </span>
  )
}

export default ConversionResult
