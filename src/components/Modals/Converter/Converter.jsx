import { CURRENCIES_SECOND_FORM, RATES_FOR_TESTS } from 'Constants/constants'
import { useEffect, useState } from 'react'

import ConversionResult from '../../Core/ConversionResult/ConversionResult'
import ErrorBoundary from '../../Core/ErrorBoundary/ErrorBoundary'
import styles from './Converter.module.scss'

function Converter(props) {
  const { currency } = props
  const rates = !window.Cypress
    ? JSON.parse(localStorage.getItem('rates'))
    : RATES_FOR_TESTS

  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [amount, setAmount] = useState(0)
  const [result, setResult] = useState(amount)

  useEffect(() => {
    rates.forEach((item) => {
      if (item.symbol === selectedCurrency) {
        setResult((item.rate * amount) / currency.rate)
      }
    })
  }, [amount, selectedCurrency])

  const handleSetAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleSelectedCurrency = (e) => {
    setSelectedCurrency(e.target.value)
  }

  return (
    <>
      <span className={styles.title}>Converter</span>
      <section className={styles.content} data-cy="converter-modal-wrapper">
        <section className={styles.user}>
          <span className={styles.symbol}>{currency.symbol}:</span>
          <input
            type="number"
            className={styles.amount}
            onChange={handleSetAmount}
            value={amount}
            data-cy="converter-input"
          />
        </section>
        <div className={styles.selectBlock}>
          <span className={styles.to}>to:</span>
          <select
            value={selectedCurrency}
            onChange={handleSelectedCurrency}
            className={styles.select}
            data-cy="converter-select"
          >
            <option value="first">Select, please</option>
            {Object.entries(CURRENCIES_SECOND_FORM).map(
              (name, index) =>
                name[0] !== currency.symbol && (
                  <option value={name[0]} key={index}>
                    {name[0]} ({name[1]})
                  </option>
                ),
            )}
          </select>
        </div>
      </section>
      <ErrorBoundary result={result}>
        <ConversionResult result={result} currency={selectedCurrency} />
      </ErrorBoundary>
    </>
  )
}

export default Converter
