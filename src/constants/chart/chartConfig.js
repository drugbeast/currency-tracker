import {
  arrowPlugin,
  candlestickPlugin,
  crosshairPlugin,
  dataOptions,
  layoutOptions,
  parsingOptions,
  pluginsOptions,
  scalesOptions,
} from './index'

const pluginsList = (theme) => [
  candlestickPlugin(theme),
  arrowPlugin(theme),
  crosshairPlugin(theme),
]

export const chartConfig = (dataset, theme) => ({
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
