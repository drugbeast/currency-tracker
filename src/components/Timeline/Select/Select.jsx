import { CURRENCIES_FOR_CHART } from 'Constants/constants'
import { Component } from 'react'
import TimelineObservable from 'Utils/TimelineObservable'

import styles from './Select.module.scss'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      selectedCurrency: Object.keys(CURRENCIES_FOR_CHART)[0],
    }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
  }

  update = (observable) => {
    this.setState({ selectedCurrency: observable.currency })
  }

  onClickOption = (e) => {
    const { isClicked } = this.state
    const selected = Object.entries(CURRENCIES_FOR_CHART).filter((item) =>
      item[1] === e.target.textContent ? item[0] : null,
    )[0][0]
    this.setState({
      selectedCurrency: selected,
      isClicked: !isClicked,
    })
    TimelineObservable.notify(selected, null)
  }

  onSelectClicked = () => {
    const { isClicked } = this.state
    this.setState({ isClicked: !isClicked })
  }

  render() {
    const { isClicked, selectedCurrency } = this.state
    return (
      <section className={styles.select}>
        <div
          className={
            isClicked
              ? `${styles.field} ${styles.up}`
              : `${styles.field} ${styles.down}`
          }
          onClick={this.onSelectClicked}
          data-cy="timeline-select"
        >
          {selectedCurrency.length > 13
            ? `${selectedCurrency.substring(0, 12)}...`
            : selectedCurrency}
        </div>
        <div
          className={
            isClicked
              ? `${styles.pop} ${styles.enabled}`
              : `${styles.pop} ${styles.disabled}`
          }
          data-cy="timeline-select-pop-up"
        >
          {Object.values(CURRENCIES_FOR_CHART).map((value, index) => (
            <div key={index} className={styles.option} onClick={this.onClickOption}>
              {value}
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Select
