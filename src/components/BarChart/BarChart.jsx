import axios from 'axios'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import chartConfig from '../../constants/chartConfig'
import currenciesForChart from '../../constants/currenciesForChart'
import TimelineObservable from '../../utils/TimelineObservable'
import styles from './BarChart.module.scss'

Chart.register(CategoryScale)

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = { dataset: [], currency: Object.keys(currenciesForChart)[0] }
  }

  componentDidMount() {
    TimelineObservable.subscribe(this)
    axios
      .get('http://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/aud')
      .then(response => {
        this.setState({ dataset: response.data })
        TimelineObservable.notify(null, response.data)
        return true
      })
      .catch(e => e)
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state
    if (prevState.currency !== currency) {
      axios
        .get('http://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/cad')
        .then(response => {
          this.setState({ dataset: response.data })
          TimelineObservable.notify(null, response.data)
          return true
        })
        .catch(e => e)
    }
  }

  update = observable => {
    this.setState({ currency: observable.currency })
  }

  render() {
    const { dataset } = this.state
    return (
      <section className={styles.chart}>
        {dataset.length > 0 && <Bar {...chartConfig(dataset)} />}
      </section>
    )
  }
}

export default BarChart
