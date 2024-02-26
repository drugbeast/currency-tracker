import arrowPlugin from '../utils/arrowPlugin'
import { calculateMax, calculateMin } from '../utils/calculateMinMax'
import candlestickPlugin from '../utils/candlestickPlugin'
import crosshairPlugin from '../utils/crosshairPlugin'
import colors from './chartColors'

const pluginsList = (theme) => [
  candlestickPlugin(theme),
  arrowPlugin(theme),
  crosshairPlugin(theme),
]

const dataOptions = (dataset, theme) => ({
  datasets: [
    {
      data: dataset,
      barPercentage: 0.7,
      categoryPercentage: 1.3,
      backgroundColor: (ctx) => {
        if (ctx.raw.close > ctx.raw.open) {
          return colors[theme].candlestickGreen
        }
        return colors[theme].candlestickRed
      },
    },
  ],
})

const scalesOptions = (theme) => ({
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
      color: colors[theme].axesTextColor,
    },
    ticks: {
      display: false,
    },
    min: (ctx) => calculateMin(ctx),
    max: (ctx) => calculateMax(ctx),
    grid: {
      display: false,
    },
  },
  y: {
    position: 'right',
    beginAtZero: true,
    ticks: {
      display: true,
      padding: window.innerWidth < 768 ? 30 : 50,
      font: {
        family: 'Poppins',
        weight: 400,
        size: 16,
      },
      color: colors[theme].axesTextColor,
      callback: (v) => v.toFixed(3),
    },
    min: (ctx) => calculateMin(ctx),
    max: (ctx) => calculateMax(ctx),
    grid: {
      display: true,
      color: colors[theme].gridLinesColor,
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
      color: colors[theme].axesTextColor,
    },
    ticks: { display: false },
    grid: {
      color: colors[theme].gridLinesColor,
    },
  },
})

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

const chartConfig = (dataset, theme) => ({
  plugins: pluginsList(theme),
  data: dataOptions(dataset, theme),
  options: {
    maintainAspectRatio: false,
    layout: layoutOptions,
    scales: scalesOptions(theme),
    parsing: parsingOptions,
    plugins: pluginsOptions,
  },
})

export default chartConfig
