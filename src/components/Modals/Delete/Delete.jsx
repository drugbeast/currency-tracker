import axios from 'axios'
import { Component } from 'react'

import TimelineObservable from '../../../utils/TimelineObservable'
import Button from '../../Core/Button/Button'
import Input from '../../Core/Input/Input'
import styles from './Delete.module.scss'

class Delete extends Component {
  constructor(props) {
    super(props)
    this.state = { currency: '', day: 0 }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
    this.setState({ currency: TimelineObservable.currency })
  }

  update = observable => {
    this.setState({ currency: observable.currency })
  }

  handleDelete = e => {
    e.preventDefault()
    const { day, currency } = this.state
    axios
      .delete(
        `https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/${currency.toLowerCase()}/${day + 1}`,
      )
      .then(response => response)
      .catch(error => error)
      .finally(() => location.reload())
      .catch(error => error)
  }

  render() {
    const { day } = this.state
    return (
      <>
        <p className={styles.title}>Delete</p>
        <form className={styles.form} onSubmit={this.handleDelete}>
          <label htmlFor="open">Day</label>
          <Input
            type="number"
            name="day"
            min={1}
            max={31}
            className="edit-input"
            value={day + 1}
            onChange={e => this.setState({ day: e.target.value - 1 })}
          />
          <Button type="submit" className="edit-button">
            delete
          </Button>
        </form>
      </>
    )
  }
}

export default Delete
