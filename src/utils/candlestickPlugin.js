const candlestickPlugin = {
  id: 'candlestickPlugin',
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      data,
      scales: { y },
    } = chart
    ctx.save()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(255, 255, 255)'

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
      ctx.stroke()
    })
  },
}

export default candlestickPlugin
