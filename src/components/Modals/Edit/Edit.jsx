import axios from 'axios'
import { Component } from 'react'

import TimelineObservable from '../../../utils/TimelineObservable'
import Button from '../../Core/Button/Button'
import Input from '../../Core/Input/Input'
import styles from './Edit.module.scss'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataset: [],
      day: 0,
      currency: '',
    }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
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
        `https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/${currency.toLowerCase()}/${day + 1}`,
        itemsToInsert,
      )
      .then((response) => response)
      .catch((error) => error)
      .finally(() => location.reload())
      .catch((error) => error)
  }

  render() {
    const { day, dataset } = this.state
    return (
      <>
        <p className={styles.title}>Edit</p>
        <form className={styles.form} onSubmit={this.handleEdit}>
          <label htmlFor="day">Day</label>
          <Input
            type="number"
            min={1}
            max={31}
            name="day"
            onChange={(e) => this.setState({ day: e.target.value - 1 })}
            value={day + 1}
            className="edit-input"
          />
          <label htmlFor="open">Open</label>
          <Input
            type="number"
            name="open"
            onChange={(e) => {
              const itemToChange = {
                ...dataset[day],
                open: Number(e.target.value),
              }
              this.setState({
                dataset: [
                  ...dataset.slice(0, day),
                  itemToChange,
                  ...dataset.slice(day + 1),
                ],
              })
            }}
            value={dataset[day] ? dataset[day].open : ''}
            className="edit-input"
          />
          <label htmlFor="high">High</label>
          <Input
            type="number"
            name="high"
            onChange={(e) => {
              const itemToChange = {
                ...dataset[day],
                high: Number(e.target.value),
              }
              this.setState({
                dataset: [
                  ...dataset.slice(0, day),
                  itemToChange,
                  ...dataset.slice(day + 1),
                ],
              })
            }}
            value={dataset[day] ? dataset[day].high : ''}
            className="edit-input"
          />
          <label htmlFor="close">Close</label>
          <Input
            type="number"
            name="close"
            onChange={(e) => {
              const itemToChange = {
                ...dataset[day],
                close: Number(e.target.value),
              }
              this.setState({
                dataset: [
                  ...dataset.slice(0, day),
                  itemToChange,
                  ...dataset.slice(day + 1),
                ],
              })
            }}
            value={dataset[day] ? dataset[day].close : ''}
            className="edit-input"
          />
          <label htmlFor="close">Low</label>
          <Input
            type="number"
            name="low"
            onChange={(e) => {
              const itemToChange = {
                ...dataset[day],
                low: Number(e.target.value),
              }
              this.setState({
                dataset: [
                  ...dataset.slice(0, day),
                  itemToChange,
                  ...dataset.slice(day + 1),
                ],
              })
            }}
            value={dataset[day] ? dataset[day].low : ''}
            className="edit-input"
          />
          <Button className="edit-button">edit</Button>
        </form>
      </>
    )
  }
}

export default Edit
