import { Component } from 'react'
import { createPortal } from 'react-dom'

import BarChart from '../../components/BarChart/BarChart'
import Button from '../../components/Core/Button/Button'
import Select from '../../components/Core/Select/Select'
import Modal from '../../components/Modals/Modal/Modal'
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
          <div className={styles.inner}>
            <Select />
            <section className={styles.cardAndButtons}>
              <TimelineCurrencyCard />
              <div className={styles.buttons}>
                <Button
                  className="timeline-page-edit-button"
                  onClick={() => {
                    this.setState({ show: true, type: 'edit' })
                  }}
                  type="edit"
                >
                  Edit day
                </Button>
                <Button
                  className="timeline-page-edit-button"
                  onClick={() => {
                    this.setState({ show: true, type: 'delete' })
                  }}
                  type="delete"
                >
                  Delete day
                </Button>
              </div>
            </section>
          </div>
        </section>
        {show
          ? createPortal(
              <Modal type={type} setShow={this.setShow} />,
              document.body,
            )
          : null}
        <BarChart />
      </article>
    )
  }
}

export default Timeline
