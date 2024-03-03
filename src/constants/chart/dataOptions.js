import { colors } from './chartColors'

export const dataOptions = (dataset, theme) => ({
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
