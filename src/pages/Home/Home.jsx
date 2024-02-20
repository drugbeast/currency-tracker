/* eslint-disable operator-linebreak */
import axios from 'axios'
import { lazy, Suspense, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import Loader from '../../components/Loader/Loader'
import currencies from '../../constants/currencies'
import styles from './Home.module.scss'

const Modal = lazy(() => import('../../components/Modal/Modal'))

export const CACHING_PERIOD = 10000000000

function Home() {
  const currenciesFromLS = localStorage.getItem('currencies')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const [cardsCurrencies, setCardsCurrencies] = useState(
    currenciesFromLS != null ? JSON.parse(currenciesFromLS) : [],
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : 0,
  )
  const [cardClicked, setCardClicked] = useState({ symbol: '', rate: 0 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (
      Date.now() - lastUpdatedFromLS > CACHING_PERIOD ||
      cardsCurrencies.length === 0
    ) {
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
      <Suspense fallback={<Loader />}>
        {show
          ? createPortal(
              <Modal
                setShow={setShow}
                cardClicked={cardClicked}
                cardsCurrencies={cardsCurrencies}
              />,
              document.body,
            )
          : null}
      </Suspense>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.title}>Quotes</div>
          <section className={styles.cards}>
            {cardsCurrencies.map(item => (
              <CurrencyCard
                setCardClicked={setCardClicked}
                setShow={setShow}
                symbol={item.symbol}
                rate={item.rate}
                key={uuidv4()}
              />
            ))}
          </section>
        </div>
      </div>
    </article>
  )
}

export default Home
