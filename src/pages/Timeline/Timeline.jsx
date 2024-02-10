import { Component } from 'react'

import BarChart from '../../components/Chart/BarChart'
import LastUpdated from '../../components/LastUpdated/LastUpdated'
import Select from '../../components/Select/Select'
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
          <LastUpdated />
          <Select />
          <BarChart />
        </div>
      </div>
    )
  }
}

export default Timeline
