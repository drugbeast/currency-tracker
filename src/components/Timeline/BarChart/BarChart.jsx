import axios from 'axios'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { chartConfig } from 'Constants/chart/chartConfig'
import { CURRENCIES_FOR_CHART, ENVS } from 'Constants/constants'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import TimelineObservable from 'Utils/TimelineObservable'

import { ThemeContext } from '../../Theme'
import styles from './BarChart.module.scss'

Chart.register(CategoryScale)

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = { dataset: [], currency: Object.keys(CURRENCIES_FOR_CHART)[0] }
  }

  componentDidMount() {
    const { currency } = this.state
    TimelineObservable.subscribe(this)
    axios
      .get(`${ENVS.mockapi_request}${currency.toLowerCase()}`)
      .then((response) => {
        const reformattedData = response.data.map((item) => ({
          ...item,
          body: [item.close, item.open],
        }))
        this.setState({ dataset: reformattedData })
        TimelineObservable.notify(null, reformattedData)
        return true
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state
    if (prevState.currency !== currency) {
      axios
        .get(
          `https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/${currency.toLowerCase()}`,
        )
        .then((response) => {
          const reformattedData = response.data.map((item) => ({
            ...item,
            body: [item.close, item.open],
          }))
          this.setState({ dataset: reformattedData })
          TimelineObservable.notify(null, reformattedData)
          return true
        })
    }
  }

  update = (observable) => {
    this.setState({ currency: observable.currency, dataset: observable.dataset })
  }

  render() {
    const { dataset } = this.state
    const { theme } = this.context
    return (
      <section className={styles.chart}>
        {dataset.length > 0 && <Bar {...chartConfig(dataset, theme)} />}
      </section>
    )
  }
}

BarChart.contextType = ThemeContext

export default BarChart
