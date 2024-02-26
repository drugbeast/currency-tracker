import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { v4 as uuidv4 } from 'uuid'

import currencies from '../../../constants/currencies'
import ConversionResult from '../../ConversionResult/ConversionResult'
import ErrorFallback from '../../Core/ErrorFallback/ErrorFallback'
import Input from '../../Core/Input/Input'
import styles from './Converter.module.scss'

function Converter(props) {
  const { currency } = props
  const rates = JSON.parse(localStorage.getItem('rates'))

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

  return (
    <>
      <span className={styles.title}>Converter</span>
      <section className={styles.content}>
        <section className={styles.user}>
          <span className={styles.symbol}>{currency.symbol}:</span>
          <Input
            min="0"
            type="number"
            className="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </section>
        <div className={styles.selectBlock}>
          <span className={styles.to}>to:</span>
          <select
            value={selectedCurrency}
            onChange={(e) => {
              setSelectedCurrency(e.target.value)
            }}
            className={styles.select}
          >
            <option value="first">Select, please</option>
            {Object.entries(currencies).map((name) =>
              name[0] !== currency.symbol ? (
                <option key={uuidv4()} value={name[0]}>
                  {name[0]} ({name[1]})
                </option>
              ) : null,
            )}
          </select>
        </div>
      </section>
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[amount]}>
        <ConversionResult result={result} currency={selectedCurrency} />
      </ErrorBoundary>
    </>
  )
}

export default Converter
