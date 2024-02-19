import axios from 'axios'
import { Component, createRef } from 'react'

import currenciesForChart from '../../constants/currenciesForChart'
import TimelineObservable from '../../utils/TimelineObservable'
import Cross from '../Cross/Cross'
import styles from './ChartModal.module.scss'

class ChartModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataset: [],
      day: 1,
      currency: Object.keys(currenciesForChart)[0],
    }
    this.openRef = createRef(null)
    this.highRef = createRef(null)
    this.closeRef = createRef(null)
    this.lowRef = createRef(null)
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
    this.setState({
      dataset: TimelineObservable.dataset,
      currency: TimelineObservable.currency,
    })
  }

  handleEdit = e => {
    e.preventDefault()
    const { day, currency } = this.state
    axios
      .put(
        `https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/${currency.toLowerCase()}/${day}`,
        {
          id: day,
          date: new Date(Date.now()).toDateString(),
          open: this.openRef.current.value,
          high: this.highRef.current.value,
          close: this.closeRef.current.value,
          low: this.lowRef.current.value,
        },
      )
      .then(response => response)
      .catch(error => error)
  }

  handleRemove = e => {
    e.preventDefault()
    const { day, currency } = this.state
    axios
      .delete(
        `https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/${currency.toLowerCase()}/${day}`,
      )
      .then(response => response)
      .catch(error => error)
  }

  update = () => {
    const { dataset } = this.state
    return dataset
  }

  render() {
    const { type, setShow } = this.props
    const { dataset, day } = this.state
    return (
      <>
        {type === 'edit' && (
          <>
            <div className={styles.wrapper} onClick={() => setShow(false)} />
            <div className={styles.window}>
              <Cross setShow={setShow} />
              <div className={styles.inner}>
                <p className={styles.title}>Edit</p>
                <form
                  className={[styles.form, styles.edit].join(' ')}
                  onSubmit={this.handleEdit}
                >
                  <label htmlFor="day">Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    name="day"
                    onChange={e => this.setState({ day: e.target.value })}
                    value={day}
                    className={styles.input}
                  />
                  <label htmlFor="open">Open</label>
                  <input
                    type="number"
                    name="open"
                    ref={this.openRef}
                    defaultValue={dataset[day] ? dataset[day].open : null}
                    className={styles.input}
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    name="high"
                    ref={this.highRef}
                    defaultValue={dataset[day] ? dataset[day].high : null}
                    className={styles.input}
                  />
                  <label htmlFor="close">Close</label>
                  <input
                    type="number"
                    name="close"
                    ref={this.closeRef}
                    defaultValue={dataset[day] ? dataset[day].close : null}
                    className={styles.input}
                  />
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    name="low"
                    ref={this.lowRef}
                    defaultValue={dataset[day] ? dataset[day].low : null}
                    className={styles.input}
                  />
                  <button type="submit" className={styles.button}>
                    edit
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {type === 'remove' && (
          <>
            <div className={styles.wrapper} onClick={() => setShow(false)} />
            <div className={[styles.window, styles.remove].join(' ')}>
              <Cross setShow={setShow} />
              <div className={styles.inner}>
                <p className={styles.title}>Edit</p>
                <form
                  className={[styles.form, styles.remove].join(' ')}
                  onSubmit={this.handleRemove}
                >
                  <label htmlFor="open">Day</label>
                  <input type="number" name="day" className={styles.input} />
                  <button type="submit" className={styles.button}>
                    delete
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}

export default ChartModal
