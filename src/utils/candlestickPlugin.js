const candlestickPlugin = {
  id: 'candlestickPlugin',
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      data,
      scales: { y },
    } = chart

    ctx.save()
    ctx.lineWidth = 1

    data.datasets[0].data.forEach((item, index) => {
      ctx.beginPath()
      ctx.moveTo(
        chart.getDatasetMeta(0).data[index].x,
        chart.getDatasetMeta(0).data[index].y,
      )
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].h),
      )
      if (item.c > item.o) {
        ctx.strokeStyle = '#16C782'
      } else {
        ctx.strokeStyle = '#EA3943'
      }
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(
        chart.getDatasetMeta(0).data[index].x,
        chart.getDatasetMeta(0).data[index].y,
      )
      ctx.lineTo(
        chart.getDatasetMeta(0).data[index].x,
        y.getPixelForValue(data.datasets[0].data[index].l),
      )
      if (item.c > item.o) {
        ctx.strokeStyle = '#16C782'
      } else {
        ctx.strokeStyle = '#EA3943'
      }
      ctx.stroke()
    })
  },
}

export default candlestickPlugin
