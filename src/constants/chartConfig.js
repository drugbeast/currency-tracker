import arrowPlugin from '../utils/arrowPlugin'
import { calculateMax, calculateMin } from '../utils/calculateMinMax'
import candlestickPlugin from '../utils/candlestickPlugin'
import crosshairPlugin from '../utils/crosshairPlugin'
import {
  candlestickGreen,
  candlestickRed,
  crosshairTextColor,
  gridLinesColor,
} from './constants'

const pluginsList = [candlestickPlugin, arrowPlugin, crosshairPlugin]

const dataOptions = dataset => ({
  datasets: [
    {
      data: dataset,
      barPercentage: 0.7,
      categoryPercentage: 1.3,
      backgroundColor: ctx => {
        if (ctx.raw.close > ctx.raw.open) {
          return candlestickGreen
        }
        return candlestickRed
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
      color: crosshairTextColor,
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
      color: crosshairTextColor,
      callback: (v, i) => (i % 2 === 0 ? v.toFixed(3) : ''),
    },
    min: ctx => calculateMin(ctx),
    max: ctx => calculateMax(ctx),
    grid: {
      display: true,
      color: gridLinesColor,
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
      color: crosshairTextColor,
    },
    ticks: { display: false },
    grid: {
      color: gridLinesColor,
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
