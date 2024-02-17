import axios from 'axios'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import Modal from '../../components/Modal/Modal'
import currencies from '../../constants/currencies'
import styles from './Home.module.scss'

const CACHING_PERIOD = 100000000

function Home() {
  const currenciesFromLS = localStorage.getItem('currencies')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const [cardsCurrencies, setCardsCurrencies] = useState(
    currenciesFromLS != null ? JSON.parse(currenciesFromLS) : [],
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : Date.now(),
  )
  const [cardClicked, setCardClicked] = useState({ symbol: '', rate: 0 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (Date.now() - lastUpdatedFromLS > CACHING_PERIOD) {
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
