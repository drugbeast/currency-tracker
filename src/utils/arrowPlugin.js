import { colors } from '../constants/chartConfig'

const arrowPlugin = theme => ({
  id: 'arrowPlugin',
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart

    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = colors[theme].axesColor

    ctx.moveTo(left - 1, top + 3)
    ctx.lineTo(left + 5, top + 10)
    ctx.moveTo(left + 1, top + 3)
    ctx.lineTo(left - 5, top + 10)
    ctx.moveTo(left, top + 5)
    ctx.lineTo(left, bottom)
    ctx.lineTo(right - 5, bottom)
    ctx.moveTo(right - 3, bottom + 1)
    ctx.lineTo(right - 10, bottom - 5)
    ctx.moveTo(right - 3, bottom - 1)
    ctx.lineTo(right - 10, bottom + 5)
    ctx.stroke()
    ctx.closePath()
  },
})

export default arrowPlugin
