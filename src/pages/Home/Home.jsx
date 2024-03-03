import axios from 'axios'
import CurrencyCard from 'Components/Home/CurrencyCard/CurrencyCard'
import Modal from 'Components/Modals/Modal/Modal'
import {
  CACHING_PERIOD,
  CURRENCIES_SECOND_FORM,
  ENVS,
  MODAL_TYPES,
  RATES_FOR_TESTS,
} from 'Constants/constants'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './Home.module.scss'

function Home() {
  const currenciesFromLS = localStorage.getItem('rates')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const getInitialValueForCardsCurrencies = () => {
    if (currenciesFromLS != null && !window.Cypress) {
      return JSON.parse(currenciesFromLS)
    }
    if (window.Cypress) {
      return RATES_FOR_TESTS
    }
    return []
  }

  const [cardsCurrencies, setCardsCurrencies] = useState(
    getInitialValueForCardsCurrencies(),
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : 0,
  )
  const [cardClicked, setCardClicked] = useState({ symbol: '', rate: 0 })
  const [show, setShow] = useState(false)
  const [error, setError] = useState({})

  const onCardClick = useCallback((currencyInformation) => {
    setCardClicked(currencyInformation)
  }, [])

  const isShow = useCallback((isShown) => {
    setShow(isShown)
  }, [])

  useEffect(() => {
    if (
      Date.now() - lastUpdatedFromLS > CACHING_PERIOD ||
      (cardsCurrencies.length === 0 && !window.Cypress)
    ) {
      axios
        .get(`${ENVS.currencybeacon_request}`, {
          params: {
            api_key: `${ENVS.currencybeacon_api_key}`,
          },
        })
        .then((response) => {
          setLastUpdated(Date.now())
          const fetchedCurrencies = Object.keys(response.data.rates)
            .map((currency) =>
              currency in CURRENCIES_SECOND_FORM
                ? {
                    rate:
                      currency !== 'BTC'
                        ? Number(response.data.rates[currency]).toFixed(2)
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
        .catch((requestError) => setError(requestError))
    }
  }, [])

  if (error.message) {
    throw new Error(`${error.message}. Please, try again later.`)
  }

  return (
    <article className={styles.currencies}>
      {show
        ? createPortal(
            <Modal
              type={MODAL_TYPES.converter}
              onModalClose={isShow}
              currency={cardClicked}
            />,
            document.body,
          )
        : null}
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.title}>Quotes</div>
          <section className={styles.cards}>
            {cardsCurrencies.map((item, index) => (
              <CurrencyCard
                setCardClicked={onCardClick}
                setShow={isShow}
                symbol={item.symbol}
                rate={item.rate}
                key={index}
              />
            ))}
          </section>
        </div>
      </div>
    </article>
  )
}

export default Home
