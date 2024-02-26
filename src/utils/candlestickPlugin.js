import colors from '../constants/chartColors'

const candlestickPlugin = (theme) => ({
  id: 'candlestickPlugin',
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      data,
      scales: { y },
    } = chart

    ctx.save()
    ctx.lineWidth = 3

    data.datasets[0].data.forEach((item, index) => {
      ctx.beginPath()
      ctx.moveTo(
        chart.getDatasetMeta(0).data[index].x,
        chart.getDatasetMeta(0).data[index].y,
      )
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].high),
      )
      if (item.close > item.open) {
        ctx.strokeStyle = colors[theme].candlestickGreen
      } else {
        ctx.strokeStyle = colors[theme].candlestickRed
      }
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(
        chart.getDatasetMeta(0).data[index].x,
        chart.getDatasetMeta(0).data[index].y,
      )
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].low),
      )
      if (item.close > item.open) {
        ctx.strokeStyle = colors[theme].candlestickGreen
      } else {
        ctx.strokeStyle = colors[theme].candlestickRed
      }
      ctx.stroke()
    })
  },
})

export default candlestickPlugin
