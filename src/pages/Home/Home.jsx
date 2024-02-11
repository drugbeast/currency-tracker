/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable indent */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import currencies from '../../constants/currencies'
import styles from './Home.module.scss'

export const CurrenciesContext = createContext([])

function Home() {
  const currenciesFromLS = localStorage.getItem('currencies')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const [cardsCurrencies, setCardsCurrencies] = useState(
    currenciesFromLS != null ? JSON.parse(currenciesFromLS) : [],
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : Date.now(),
  )

  useEffect(() => {
    if (Date.now() - lastUpdatedFromLS > 100000000) {
      axios
        .get(
          `https://api.currencybeacon.com/v1/latest?api_key=${process.env.REACT_APP_CURRENCYBEACON_API_KEY}`,
        )
        .then(response => {
          setLastUpdated(Date.now())
          const fetchedCurrencies = Object.keys(response.data.rates)
            .map(currency =>
              currency in currencies
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
          setCardsCurrencies(fetchedCurrencies)
          localStorage.setItem('currencies', JSON.stringify(fetchedCurrencies))
          localStorage.setItem('lastUpdated', JSON.stringify(lastUpdated))
          return true
        })
        .catch(e => e)
    }
  }, [])

  return (
    <article className={styles.currencies}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.title}>Quotes</div>
          <section className={styles.cards}>
            {cardsCurrencies.map(item => (
              <CurrenciesContext.Provider
                value={{
                  cardsCurrencies,
                  rate: item.rate,
                  symbol: item.symbol,
                }}
                key={uuidv4()}
              >
                <CurrencyCard />
              </CurrenciesContext.Provider>
            ))}
          </section>
        </div>
      </div>
    </article>
  )
}

export default Home
