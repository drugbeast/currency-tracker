import { Component } from 'react'

import BarChart from '../../components/Chart/BarChart'
import styles from './Timeline.module.scss'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.timeline}>
        <div className="container">
          <BarChart />
        </div>
      </div>
    )
  }
}

export default Timeline
