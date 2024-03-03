import { CURRENCIES_FOR_CHART } from 'Constants/constants'
import icons from 'Constants/icons'
import { Component } from 'react'
import TimelineObservable from 'Utils/TimelineObservable'

import styles from './TimelineCurrencyCard.module.scss'

class TimelineCurrencyCard extends Component {
  constructor(props) {
    super(props)
    this.state = { currency: Object.keys(CURRENCIES_FOR_CHART)[0] }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
  }

  update = (observable) => {
    this.setState({ currency: observable.currency })
  }

  render() {
    const { currency } = this.state
    const symbol = Object.entries(CURRENCIES_FOR_CHART).filter((pair) =>
      pair[0] === currency ? pair[0] : null,
    )[0][0]
    return (
      <section className={styles.card}>
        <div className={styles.left}>
          {icons[symbol]({ className: styles.icon })}
        </div>
        <div className={styles.right}>
          <p className={styles.title} data-cy="timeline-currency-card-title">
            {currency}
          </p>
          <span className={styles.symbol}>{symbol}</span>
        </div>
      </section>
    )
  }
}

export default TimelineCurrencyCard
