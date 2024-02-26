import axios from 'axios'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import chartConfig from '../../constants/chartConfig'
import currenciesForChart from '../../constants/currenciesForChart'
import TimelineObservable from '../../utils/TimelineObservable'
import { ThemeContext } from '../Theme'
import styles from './BarChart.module.scss'

Chart.register(CategoryScale)

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = { dataset: [], currency: Object.keys(currenciesForChart)[0] }
  }

  componentDidMount() {
    const { currency } = this.state
    TimelineObservable.subscribe(this)
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
      .catch((e) => e)
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
        .catch((e) => e)
    }
  }

  update = (observable) => {
    this.setState({ currency: observable.currency })
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
