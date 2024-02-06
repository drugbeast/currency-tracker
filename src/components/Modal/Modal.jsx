import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { iconsNames } from '../../constants/icons'
import { CurrenciesContext } from '../../pages/Home/Home'
import styles from './Modal.module.scss'

function Modal() {
  const { currencies, symbol, rate } = useContext(CurrenciesContext)

  const [selectedCurrency, setSelectedCurrency] = useState('')
  let exchangeRate = 0

  currencies.forEach(item => {
    if (item.symbol === selectedCurrency) {
      exchangeRate = item.rate / rate
    }
  })

  return (
    <div className={styles.modal}>
      <div className={styles.inner}>
        <span className={styles.title}>Converter</span>
        <div className={styles.content}>
          <span className={styles.text}>
            Your currency:{' '}
            <span className={styles.symbol}>
              {iconsNames[symbol]} ({symbol})
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
              {Object.entries(iconsNames).map(item =>
                item[0] !== symbol ? (
                  <option key={uuidv4()} value={item[0]}>
                    {item[1]} ({item[0]})
                  </option>
                ) : null,
              )}
            </select>
          </div>
        </div>
        <h1 className={styles.result}>{exchangeRate.toFixed(2)}</h1>
      </div>
    </div>
  )
}

export default Modal
