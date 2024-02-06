/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable indent */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import { iconsNames } from '../../constants/icons'
import styles from './Home.module.scss'

export const CurrenciesContext = createContext([])

function Home() {
  const currenciesFromLS = localStorage.getItem('currencies')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const [currencies, setCurrencies] = useState(
    currenciesFromLS != null ? JSON.parse(currenciesFromLS) : [],
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : Date.now(),
  )

  useEffect(() => {
    if (Date.now() - lastUpdatedFromLS > 10000000) {
      axios
        .get(
          `https://api.currencybeacon.com/v1/latest?api_key=${process.env.REACT_APP_API_KEY}`,
        )
        .then(response => {
          setLastUpdated(Date.now())
          const fetchedCurrencies = Object.keys(response.data.rates)
            .map(currency =>
              currency in iconsNames
                ? {
                    rate:
                      currency !== 'BTC'
                        ? response.data.rates[currency].toFixed(2)
                        : response.data.rates[currency],
                    symbol: currency,
                  }
                : null,
            )
            .filter(currency => currency != null)
          setCurrencies(fetchedCurrencies)
          localStorage.setItem('currencies', JSON.stringify(fetchedCurrencies))
          localStorage.setItem('lastUpdated', JSON.stringify(lastUpdated))
          return true
        })
        .catch(e => e)
    }
  }, [])

  const formatDate = last => {
    const date = new Date(last)
    const isPm = date.getHours() > 12
    return `${
      isPm ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${isPm ? 'pm' : 'am'}`
  }

  return (
    <div className={styles.currencies}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.updated}>
            <div className={styles.biggest}>
              <div className={styles.big}>
                <div className={styles.little} />
              </div>
            </div>
            <span className={styles.updatedText}>
              Last updated at {formatDate(lastUpdated)}
            </span>
          </div>
          <div className={styles.title}>Quotes</div>

          <div className={styles.cards}>
            {currencies.map(item => (
              <CurrenciesContext.Provider
                value={{
                  currencies,
                  rate: item.rate,
                  symbol: item.symbol,
                }}
                key={uuidv4()}
              >
                <CurrencyCard />
              </CurrenciesContext.Provider>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
