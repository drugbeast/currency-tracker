import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import dataset from '../../constants/dataset'
import arrowPlugin from '../../utils/arrowPlugin'
import { calculateMax, calculateMin } from '../../utils/calculateMinMax'
import candlestickPlugin from '../../utils/candlestickPlugin'
import crosshairPlugin from '../../utils/crosshairPlugin'

Chart.register(CategoryScale)

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Bar
        plugins={[candlestickPlugin, arrowPlugin, crosshairPlugin]}
        data={{
          datasets: [
            {
              data: dataset.data,
              barPercentage: 0.7,
              categoryPercentage: 1.3,
              backgroundColor: ctx => {
                if (ctx.raw.c > ctx.raw.o) {
                  return '#16C782'
                }
                return '#EA3943'
              },
            },
          ],
        }}
        options={{
          layout: {
            padding: {
              left: 10,
            },
          },
          scales: {
            y1: {
              position: 'left',
              beginAtZero: true,
              title: {
                align: 'end',
                display: true,
                text: 'Value',
                font: {
                  family: 'PoppinsRegular400',
                  size: 16,
                },
                color: '#FFFFFF',
              },
              ticks: {
                display: false,
              },
              min: ctx => calculateMin(ctx),
              max: ctx => calculateMax(ctx),
              grid: {
                display: false,
              },
            },
            y: {
              position: 'right',
              beginAtZero: true,
              ticks: {
                display: true,
                stepSize: 0.001,
                padding: 50,
                font: {
                  family: 'PoppinsRegular400',
                  size: 16,
                },
                color: '#FFFFFF',
                callback: (v, i) => (i % 2 === 0 ? v.toFixed(3) : ''),
              },
              min: ctx => calculateMin(ctx),
              max: ctx => calculateMax(ctx),
              grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
            x: {
              title: {
                align: 'end',
                display: true,
                text: 'DAY',
                font: {
                  family: 'PoppinsRegular400',
                  size: 16,
                },
                color: '#FFFFFF',
              },
              ticks: { display: false },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'body',
          },
          plugins: {
            crosshairPlugin,
            arrowPlugin,
            candlestickPlugin,
            legend: {
              display: false,
              labels: {
                font: {
                  family: 'PoppinsRegular400',
                },
              },
            },
          },
        }}
      />
    )
  }
}

export default BarChart
