/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { v4 as uuidv4 } from 'uuid'

import currencies from '../../constants/currencies'
import Cross from '../Cross/Cross'
import ErrorFallback from '../ErrorFallback/ErrorFallback'
import styles from './Modal.module.scss'

function Result({ result }) {
  if (result < 0) {
    throw new Error('Oops... Negative Number! Please, remove the "-" sign.')
  }
  return (
    <span className={styles.result}>{result === 0 ? 0 : result.toFixed(3)}</span>
  )
}

function Modal({ setShow, cardClicked, cardsCurrencies }) {
  const [amount, setAmount] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [result, setResult] = useState(0)

  const onPress = e => {
    if (e.key === 'Escape') {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onPress)
    return () => document.removeEventListener('keydown', onPress)
  }, [])

  useEffect(() => {
    cardsCurrencies.forEach(item => {
      if (item.symbol === selectedCurrency) {
        setResult((item.rate * amount) / cardClicked.rate)
      }
    })
  }, [amount, selectedCurrency])

  return (
    <>
      <article className={styles.container} onClick={() => setShow(false)} />
      <div className={styles.modal}>
        <Cross setShow={setShow} />
        <div className={styles.inner}>
          <span className={styles.title}>Converter</span>
          <section className={styles.content}>
            <section className={styles.user}>
              <span className={styles.symbol}>{cardClicked.symbol}:</span>
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
                  item[0] !== cardClicked.symbol ? (
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
    </>
  )
}

export default Modal
