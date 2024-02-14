import arrowPlugin from '../utils/arrowPlugin'
import { calculateMax, calculateMin } from '../utils/calculateMinMax'
import candlestickPlugin from '../utils/candlestickPlugin'
import crosshairPlugin from '../utils/crosshairPlugin'

const pluginsList = [candlestickPlugin, arrowPlugin, crosshairPlugin]

const dataOptions = dataset => ({
  datasets: [
    {
      data: dataset,
      barPercentage: 0.7,
      categoryPercentage: 1.3,
      backgroundColor: ctx => {
        if (ctx.raw.close > ctx.raw.open) {
          return '#16C782'
        }
        return '#EA3943'
      },
    },
  ],
})

const scalesOptions = {
  y1: {
    position: 'left',
    beginAtZero: true,
    title: {
      align: 'end',
      display: true,
      text: 'Value',
      font: {
        family: 'Poppins',
        weight: 400,
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
      padding: 50,
      font: {
        family: 'Poppins',
        weight: 400,
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
        family: 'Poppins',
        weight: 400,
        size: 16,
      },
      color: '#FFFFFF',
    },
    ticks: { display: false },
    grid: {
      color: 'rgba(255, 255, 255, 0.1)',
    },
  },
}

const layoutOptions = {
  padding: {
    left: 10,
  },
}

const parsingOptions = {
  xAxisKey: 'date',
  yAxisKey: 'body',
  options: {
    animation: false,
  },
}

const pluginsOptions = {
  legend: {
    display: false,
  },
}

const chartConfig = dataset => ({
  plugins: pluginsList,
  data: dataOptions(dataset),
  options: {
    layout: layoutOptions,
    scales: scalesOptions,
    parsing: parsingOptions,
    plugins: pluginsOptions,
  },
})

export default chartConfig
