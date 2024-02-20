import { Component, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'

import Loader from '../../components/Loader/Loader'
import Select from '../../components/Select/Select'
import TimelineCurrencyCard from '../../components/TimelineCurrencyCard/TimelineCurrencyCard'
import TimelineObservable from '../../utils/TimelineObservable'
import styles from './Timeline.module.scss'

const BarChart = lazy(() => import('../../components/BarChart/BarChart'))
const ChartModal = lazy(() => import('../../components/ChartModal/ChartModal'))
const MessageModal = lazy(
  () => import('../../components/MessageModal/MessageModal'),
)

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false, type: '', showMessageModal: false }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
  }

  update = observable => {
    if (observable.dataset.length === 30) {
      this.setState({ showMessageModal: true })
    }
  }

  setShow = () => {
    this.setState({ show: false })
  }

  setShowMessageModal = () => {
    this.setState({ showMessageModal: false })
  }

  render() {
    const { show, type, showMessageModal } = this.state
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
          </div>
        </section>
        <Suspense fallback={<Loader />}>
          {show
            ? createPortal(
                <ChartModal type={type} setShow={this.setShow} />,
                document.body,
              )
            : null}
        </Suspense>
        <Suspense fallback={<Loader />}>
          {showMessageModal
            ? createPortal(
                <MessageModal setShowMessageModal={this.setShowMessageModal} />,
                document.body,
              )
            : null}
        </Suspense>
        <BarChart />
      </article>
    )
  }
}

export default Timeline
