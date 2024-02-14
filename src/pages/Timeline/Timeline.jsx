import { Component } from 'react'
import { createPortal } from 'react-dom'

import BarChart from '../../components/BarChart/BarChart'
import ChartModal from '../../components/ChartModal/ChartModal'
import Select from '../../components/Select/Select'
import TimelineCurrencyCard from '../../components/TimelineCurrencyCard/TimelineCurrencyCard'
import styles from './Timeline.module.scss'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false, type: '' }
  }

  setShow = () => {
    this.setState({ show: false })
  }

  render() {
    const { show, type } = this.state
    return (
      <article className={styles.timeline}>
        <section className="container">
          <Select />
          <section className={styles.cardAndButtons}>
            <TimelineCurrencyCard />
            <div className={styles.buttons}>
              <button
                type="button"
                className={[styles.button, styles.edit].join(' ')}
                onClick={() => {
                  this.setState({ show: true, type: 'edit' })
                }}
              >
                Edit day
              </button>
              <button
                type="button"
                className={[styles.button, styles.remove].join(' ')}
                onClick={() => {
                  this.setState({ show: true, type: 'remove' })
                }}
              >
                Remove day
              </button>
            </div>
          </section>
          <BarChart />
          {show
            ? createPortal(
                <ChartModal type={type} setShow={this.setShow} />,
                document.body,
              )
            : null}
        </section>
      </article>
    )
  }
}

export default Timeline
