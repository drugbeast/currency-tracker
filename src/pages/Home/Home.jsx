import axios from 'axios'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import Modal from '../../components/Modals/Modal/Modal'
import currencies from '../../constants/currencies'
import styles from './Home.module.scss'

export const CACHING_PERIOD = 1000000000

function Home() {
  const currenciesFromLS = localStorage.getItem('rates')
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
          `https://api.currencybeacon.com/v1/latest?api_key=${window.Cypress ? 'fQhSOyA6tVQsX8jn2VoWyFeAdI1c4efJ' : process.env.REACT_APP_CURRENCYBEACON_API_KEY}`,
        )
        .then((response) => {
          setLastUpdated(Date.now())
          const fetchedCurrencies = Object.keys(response.data.rates)
            .map((currency) =>
              currency in currencies
                ? {
                    rate:
                      currency !== 'BTC'
                        ? response.data.rates[currency].toFixed(2)
                        : Number(response.data.rates[currency]),
                    symbol: currency,
                  }
                : null,
            )
            .filter((currency) => currency != null)
          setCardsCurrencies(fetchedCurrencies)
          localStorage.setItem('rates', JSON.stringify(fetchedCurrencies))
          localStorage.setItem('lastUpdated', JSON.stringify(lastUpdated))
          return true
        })
        .catch((e) => e)
    }
  }, [])

  return (
    <article className={styles.currencies}>
      {show
        ? createPortal(
            <Modal type="converter" setShow={setShow} currency={cardClicked} />,
            document.body,
          )
        : null}
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.title}>Quotes</div>
          <section className={styles.cards}>
            {cardsCurrencies.map((item) => (
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
