import { useState, useEffect } from 'react'
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard'
import styles from './Home.module.scss'
import axios from 'axios'
import { icons } from '../../constants/icons'
import { iconsNames } from '../../constants/icons'
import { v4 as uuidv4 } from 'uuid'

function Home() {
  const quotesFromLS = localStorage.getItem('quotes')
  const lastUpdatedFromLS = localStorage.getItem('lastUpdated')

  const [quotes, setQuotes] = useState(
    quotesFromLS != null ? JSON.parse(quotesFromLS) : {},
  )
  const [lastUpdated, setLastUpdated] = useState(
    lastUpdatedFromLS != null ? JSON.parse(lastUpdatedFromLS) : Date.now(),
  )

  useEffect(() => {
    if (Date.now() - lastUpdatedFromLS > 100000000) {
      axios
        .get(
          `https://api.currencybeacon.com/v1/latest?api_key=${process.env.REACT_APP_API_KEY}`,
        )
        .then(response => {
          setLastUpdated(Date.now())
          setQuotes(response.data.rates)
        })
    }
  }, [])

  localStorage.setItem('quotes', JSON.stringify(quotes))
  localStorage.setItem('lastUpdated', JSON.stringify(lastUpdated))

  const currencies = []
  for (let quote in quotes) {
    if (quote in icons) {
      currencies.push({
        icon: icons[quote]({ width: 80, height: 80 }),
        rate: quote != 'BTC' ? quotes[quote].toFixed(2) : quotes[quote],
        title: iconsNames[quote],
      })
    }
  }

  const formatDate = lastUpdated => {
    const date = new Date(lastUpdated)
    const isPm = date.getHours() > 12
    return (
      (isPm ? date.getHours() - 12 : date.getHours()) +
      ':' +
      date.getMinutes() +
      (isPm ? 'pm' : 'am')
    )
  }

  const stocks = [currencies[0], currencies[1]]

  return (
    <div className={styles.currencies}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.updated}>
            <div className={styles.biggest}>
              <div className={styles.big}>
                <div className={styles.little}></div>
              </div>
            </div>
            <span className={styles.updatedText}>
              Last updated at {formatDate(lastUpdated)}
            </span>
          </div>
          <div className={styles.title}>Stocks</div>
          <div className={styles.cards}>
            {stocks.map(item => (
              <CurrencyCard
                icon={item.icon}
                rate={item.rate}
                key={uuidv4()}
                title={item.title}
              />
            ))}
          </div>
          <div className={styles.title}>Quotes</div>
          <div className={styles.cards}>
            {currencies.map(item => (
              <CurrencyCard
                icon={item.icon}
                rate={item.rate}
                key={uuidv4()}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
