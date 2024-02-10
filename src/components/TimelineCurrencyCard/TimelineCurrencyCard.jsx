import { Component } from 'react'

import currencies from '../../constants/currencies'
import icons from '../../constants/icons'
import styles from './TimelineCurrencyCard.module.scss'

class TimelineCurrencyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { currency } = this.props
    const symbol = Object.entries(currencies).filter(pair =>
      pair[1] === currency ? pair[0] : null,
    )[0][0]
    return (
      <section className={styles.card}>
        <div className={styles.left}>
          {icons[symbol]({ width: 80, height: 80 })}
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
