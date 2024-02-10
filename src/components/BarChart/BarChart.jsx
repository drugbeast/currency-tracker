import axios from 'axios'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import chartConfig from '../../constants/chartConfig'
// import currencies from '../../constants/currencies'
import styles from './BarChart.module.scss'

const DAYS = 30

Chart.register(CategoryScale)

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = { dataset: [] }
  }

  componentDidMount() {
    // const { currency } = this.props
    axios
      .get(
        // `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=${Object.keys(currencies).filter(item => currencies[item] === currency ? item : null)}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`,
        'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo',
      )
      .then(response => {
        this.reformatTheData(response.data)
        return true
      })
      .catch(e => e)
  }

  componentDidUpdate(prevProps) {
    const { currency } = this.props
    if (prevProps.currency !== currency) {
      axios
        .get(
          // `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=${Object.keys(currencies).filter(item => currencies[item] === currency ? item : null)}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`,
          'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo',
        )
        .then(response => {
          this.reformatTheData(response.data)
          return true
        })
        .catch(e => e)
    }
  }

  reformatTheData = data => {
    const newData = []
    Object.entries(data['Time Series FX (Daily)']).forEach((item, index) => {
      if (index < DAYS) {
        newData.push({
          date: item[0],
          o: item[1]['1. open'],
          h: item[1]['2. high'],
          l: item[1]['3. low'],
          c: item[1]['4. close'],
          body: [Number(item[1]['1. open']), Number(item[1]['4. close'])],
        })
      }
    })
    this.setState({ dataset: newData })
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
