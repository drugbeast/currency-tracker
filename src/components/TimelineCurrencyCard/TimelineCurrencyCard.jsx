import { Component } from 'react'

import currenciesForChart from '../../constants/currenciesForChart'
import icons from '../../constants/icons'
import TimelineObservable from '../../utils/TimelineObservable'
import styles from './TimelineCurrencyCard.module.scss'

class TimelineCurrencyCard extends Component {
  constructor(props) {
    super(props)
    this.state = { currency: Object.keys(currenciesForChart)[0] }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
  }

  update = observable => {
    this.setState({ currency: observable.currency })
  }

  render() {
    const { currency } = this.state
    const symbol = Object.entries(currenciesForChart).filter(pair =>
      pair[0] === currency ? pair[1] : null,
    )[0][0]
    return (
      <section className={styles.card}>
        <div className={styles.left}>
          {icons[symbol]({ className: styles.icon })}
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{currency}</p>
          <span className={styles.symbol}>{symbol}</span>
        </div>
      </section>
    )
  }
}

export default TimelineCurrencyCard
