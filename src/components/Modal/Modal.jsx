import { useContext, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { v4 as uuidv4 } from 'uuid'

import currencies from '../../constants/currencies'
import { CurrenciesContext } from '../../pages/Home/Home'
import ErrorFallback from '../ErrorFallback/ErrorFallback'
import styles from './Modal.module.scss'

function Result({ result }) {
  if (result < 0) {
    throw new Error('Oops... Negative Number! Please, remove the "-" sign.')
  }
  return (
    <span className={styles.result}>{result !== 0 ? result.toFixed(3) : 0}</span>
  )
}

function Modal() {
  const { cardsCurrencies, symbol, rate } = useContext(CurrenciesContext)
  const [amount, setAmount] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [result, setResult] = useState(0)

  useEffect(() => {
    cardsCurrencies.forEach(item => {
      if (item.symbol === selectedCurrency) {
        setResult((item.rate * amount) / rate)
      }
    })
  }, [amount, selectedCurrency])

  return (
    <article className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.inner}>
          <span className={styles.title}>Converter</span>
          <section className={styles.content}>
            <section className={styles.user}>
              <span className={styles.symbol}>{symbol}:</span>
              <input
                min="0"
                type="number"
                className={styles.amount}
                onChange={e => setAmount(e.target.value)}
                value={amount}
              />
            </section>
            <div className={styles.selectBlock}>
              <span className={styles.to}>to:</span>
              <select
                value={selectedCurrency}
                onChange={e => {
                  setSelectedCurrency(e.target.value)
                }}
                className={styles.select}
              >
                <option value="first">Select, please</option>
                {Object.entries(currencies).map(item =>
                  item[0] !== symbol ? (
                    <option key={uuidv4()} value={item[0]}>
                      {item[1]} ({item[0]})
                    </option>
                  ) : null,
                )}
              </select>
            </div>
          </section>
          <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[amount]}>
            <Result result={result} />
          </ErrorBoundary>
        </div>
      </div>
    </article>
  )
}

export default Modal
