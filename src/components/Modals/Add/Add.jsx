import axios from 'axios'
import { ENVS } from 'Constants/constants'
import { Component } from 'react'
import TimelineObservable from 'Utils/TimelineObservable'

import styles from './Add.module.scss'

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: '',
      open: '',
      high: '',
      close: '',
      low: '',
      error: {},
    }
  }

  componentDidMount() {
    this.setState({ currency: TimelineObservable.currency })
  }

  handleAdd = (e) => {
    e.preventDefault()
    const { currency, open, high, close, low } = this.state
    const itemToAdd = {
      open: Number(open),
      high: Number(high),
      close: Number(close),
      low: Number(low),
    }
    const newDate = new Date(Date.now())
    newDate.setDate(
      Number(
        TimelineObservable.dataset[
          TimelineObservable.dataset.length - 1
        ].date.slice(0, 2),
      ) + 1,
    )
    const dateStr = `${newDate.toLocaleDateString().split('.').join('-')}`
    TimelineObservable.notify(null, [
      ...TimelineObservable.dataset,
      { ...itemToAdd, date: dateStr, body: [Number(open), Number(close)] },
    ])
    axios
      .post(`${ENVS.mockapi_request}${currency.toLowerCase()}`, {
        ...itemToAdd,
        date: dateStr,
      })
      .then((response) => response)
      .catch((error) => this.setState({ error }))
  }

  render() {
    const { open, high, close, low, error } = this.state

    if (error.message) {
      throw new Error(`${error.message}. Please, try again later.`)
    }

    return (
      <>
        <p className={styles.title}>Add</p>
        <form className={styles.form} onSubmit={this.handleAdd}>
          <label htmlFor="open" className={styles.label}>
            <p>Open</p>
            <input
              required
              id="open"
              type="number"
              name="open"
              onChange={(e) => {
                this.setState({ open: e.target.value })
              }}
              value={open}
              className={styles.input}
              data-cy="timeline-add-open-input"
            />
          </label>
          <label htmlFor="high" className={styles.label}>
            <p>High</p>
            <input
              required
              id="high"
              type="number"
              name="high"
              onChange={(e) => {
                this.setState({ high: e.target.value })
              }}
              value={high}
              className={styles.input}
              data-cy="timeline-add-high-input"
            />
          </label>
          <label htmlFor="close" className={styles.label}>
            <p>Close</p>
            <input
              required
              id="close"
              type="number"
              name="close"
              onChange={(e) => {
                this.setState({ close: e.target.value })
              }}
              value={close}
              className={styles.input}
              data-cy="timeline-add-close-input"
            />
          </label>
          <label htmlFor="low" className={styles.label}>
            <p>Low</p>
            <input
              required
              id="low"
              type="number"
              name="low"
              onChange={(e) => {
                this.setState({ low: e.target.value })
              }}
              value={low}
              className={styles.input}
              data-cy="timeline-add-low-input"
            />
          </label>
          <button
            type="submit"
            className={styles.button}
            data-cy="timeline-add-modal-action"
          >
            add
          </button>
        </form>
      </>
    )
  }
}

export default Add
