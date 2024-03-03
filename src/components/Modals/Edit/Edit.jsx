import axios from 'axios'
import { ENVS } from 'Constants/constants'
import { Component } from 'react'

import TimelineObservable from '../../../utils/TimelineObservable'
import styles from './Edit.module.scss'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataset: [],
      day: '',
      currency: '',
      error: {},
    }
  }

  componentDidMount() {
    this.setState({
      dataset: TimelineObservable.dataset,
      currency: TimelineObservable.currency,
    })
  }

  handleEdit = (e) => {
    e.preventDefault()
    const { day, currency, dataset } = this.state
    const itemsToInsert = {
      id: day,
      date: dataset[day].date,
      open: dataset[day].open,
      high: dataset[day].high,
      close: dataset[day].close,
      low: dataset[day].low,
    }
    axios
      .put(
        `${ENVS.mockapi_request}${currency.toLowerCase()}/${day + 1}`,
        itemsToInsert,
      )
      .then((response) => response)
      .catch((error) => this.setState({ error }))
  }

  handleChangeInput = (e) => {
    const { day, dataset } = this.state
    const itemToChange = {
      ...dataset[day],
      [e.target.name]: Number(e.target.value),
    }
    const newDataset = [
      ...dataset.slice(0, day),
      itemToChange,
      ...dataset.slice(day + 1),
    ]
    this.setState({
      dataset: newDataset,
    })
    TimelineObservable.notify(null, newDataset)
  }

  handleChangeDay = (e) => {
    this.setState({ day: e.target.value - 1 })
  }

  render() {
    const { day, dataset, error } = this.state
    if (error.message) {
      throw new Error(`${error.message}. Please, try again later`)
    }
    return (
      <>
        <p className={styles.title}>Edit</p>
        <form className={styles.form} onSubmit={this.handleEdit}>
          <label htmlFor="day">Day</label>
          <input
            required
            type="number"
            min="1"
            max="31"
            name="day"
            onChange={this.handleChangeDay}
            className={styles.input}
            data-cy="timeline-edit-day-input"
          />
          <label htmlFor="open">Open</label>
          <input
            required
            type="number"
            name="open"
            onChange={this.handleChangeInput}
            value={dataset[day] ? dataset[day].open : ''}
            className={styles.input}
            data-cy="timeline-edit-open-input"
          />
          <label htmlFor="high">High</label>
          <input
            required
            type="number"
            name="high"
            onChange={this.handleChangeInput}
            value={dataset[day] ? dataset[day].high : ''}
            className={styles.input}
            data-cy="timeline-edit-high-input"
          />
          <label htmlFor="close">Close</label>
          <input
            required
            type="number"
            name="close"
            onChange={this.handleChangeInput}
            value={dataset[day] ? dataset[day].close : ''}
            className={styles.input}
            data-cy="timeline-edit-close-input"
          />
          <label htmlFor="low">Low</label>
          <input
            required
            type="number"
            name="low"
            onChange={this.handleChangeInput}
            value={dataset[day] ? dataset[day].low : ''}
            className={styles.input}
            data-cy="timeline-edit-low-input"
          />
          <button
            type="submit"
            className={styles.button}
            data-cy="timeline-edit-action"
          >
            edit
          </button>
        </form>
      </>
    )
  }
}

export default Edit
