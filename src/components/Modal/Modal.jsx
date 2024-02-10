import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import currencies from '../../constants/currencies'
import { CurrenciesContext } from '../../pages/Home/Home'
import styles from './Modal.module.scss'

function Modal() {
  const { cardsCurrencies, symbol, rate } = useContext(CurrenciesContext)

  const [selectedCurrency, setSelectedCurrency] = useState('')
  let exchangeRate = 0

  cardsCurrencies.forEach(item => {
    if (item.symbol === selectedCurrency) {
      exchangeRate = item.rate / rate
    }
  })

  return (
    <article className={styles.modal}>
      <div className={styles.inner}>
        <span className={styles.title}>Converter</span>
        <section className={styles.content}>
          <span className={styles.text}>
            Your currency:{' '}
            <span className={styles.symbol}>
              {currencies[symbol]} ({symbol})
            </span>
          </span>
          <div className={styles.select}>
            <span className={styles.text}>Choose a currency: </span>
            <select
              value={selectedCurrency}
              onChange={e => {
                setSelectedCurrency(e.target.value)
              }}
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
        <h1 className={styles.result}>{exchangeRate.toFixed(3)}</h1>
      </div>
    </article>
  )
}

export default Modal
