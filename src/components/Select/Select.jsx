import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import currenciesForChart from '../../constants/currenciesForChart'
import TimelineObservable from '../../utils/TimelineObservable'
import styles from './Select.module.scss'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      selectedCurrency: Object.values(currenciesForChart)[0],
    }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
  }

  update = observable => {
    this.setState({ selectedCurrency: observable.currency })
  }

  render() {
    const { isClicked, selectedCurrency } = this.state
    return (
      <section className={styles.select}>
        <div
          className={
            isClicked
              ? [styles.field, styles.up].join(' ')
              : [styles.field, styles.down].join(' ')
          }
          onClick={() => this.setState({ isClicked: !isClicked })}
        >
          {selectedCurrency.length > 13
            ? `${selectedCurrency.substring(0, 12)}...`
            : selectedCurrency}
        </div>
        <div
          className={
            isClicked
              ? [styles.pop, styles.enabled].join(' ')
              : [styles.pop, styles.disabled].join(' ')
          }
        >
          {Object.values(currenciesForChart).map(value => (
            <div
              key={uuidv4()}
              className={styles.option}
              onClick={e => {
                this.setState({
                  selectedCurrency: e.target.textContent,
                  isClicked: !isClicked,
                })
                TimelineObservable.notify(e.target.textContent, null)
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Select
