import { Component } from 'react'

import BarChart from '../../components/BarChart/BarChart'
import Select from '../../components/Select/Select'
import TimelineCurrencyCard from '../../components/TimelineCurrencyCard/TimelineCurrencyCard'
import currencies from '../../constants/currencies'
import styles from './Timeline.module.scss'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { currency: Object.values(currencies)[0] }
  }

  setCurrency = value => {
    this.setState({ currency: value })
  }

  render() {
    const { currency } = this.state
    return (
      <article className={styles.timeline}>
        <section className="container">
          <Select setCurrency={this.setCurrency} />
          <TimelineCurrencyCard currency={currency} />
          <BarChart currency={currency} />
        </section>
      </article>
    )
  }
}

export default Timeline
