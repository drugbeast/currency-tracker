import axios from 'axios'
import Modal from 'Components/Modals/Modal/Modal'
import BarChart from 'Components/Timeline/BarChart/BarChart'
import Select from 'Components/Timeline/Select/Select'
import TimelineCurrencyCard from 'Components/Timeline/TimelineCurrencyCard/TimelineCurrencyCard'
import { ENVS, MODAL_TYPES } from 'Constants/constants'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import TimelineObservable from 'Utils/TimelineObservable'

import styles from './Timeline.module.scss'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false, type: '', error: {} }
  }

  componentDidUpdate() {
    TimelineObservable.subscribe(this)
  }

  handleDelete = () => {
    this.setState({ type: 'delete' })
    TimelineObservable.notify(
      null,
      TimelineObservable.dataset.slice(0, TimelineObservable.dataset.length - 1),
    )
    axios
      .delete(
        `${ENVS.mockapi_request}${TimelineObservable.currency.toLowerCase()}/${TimelineObservable.dataset.length + 1}`,
      )
      .then((response) => response)
      .catch((error) => this.setState({ error }))
  }

  onModalClose = () => {
    this.setState({ show: false, type: '' })
  }

  update = (observable) => {
    if (observable.dataset.length === 30) {
      this.setState({ type: MODAL_TYPES.message, show: true })
    }
  }

  onOpenAddModal = () => {
    this.setState({ show: true, type: MODAL_TYPES.add })
  }

  onOpenEditModal = () => {
    this.setState({ show: true, type: MODAL_TYPES.edit })
  }

  render() {
    const { show, type, error } = this.state
    if (error.message) {
      throw new Error(`${error.message}. Please, try again later`)
    }
    return (
      <article className={styles.timeline}>
        <section className="container">
          <div className={styles.inner}>
            <Select />
            <section className={styles.cardAndButtons}>
              <TimelineCurrencyCard />
              <div className={styles.buttons}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.add}`}
                  onClick={this.onOpenAddModal}
                  data-cy="timeline-add-button"
                >
                  Add day
                </button>
                <button
                  type="button"
                  className={`${styles.button} ${styles.edit}`}
                  onClick={this.onOpenEditModal}
                  data-cy="timeline-edit-button"
                >
                  Edit day
                </button>
                <button
                  type="button"
                  className={`${styles.button} ${styles.delete}`}
                  onClick={this.handleDelete}
                  data-cy="timeline-delete-button"
                >
                  Delete day
                </button>
              </div>
            </section>
          </div>
        </section>
        {show === true || type === MODAL_TYPES.message
          ? createPortal(
              <Modal type={type} onModalClose={this.onModalClose} />,
              document.body,
            )
          : null}
        <BarChart />
      </article>
    )
  }
}

export default Timeline
