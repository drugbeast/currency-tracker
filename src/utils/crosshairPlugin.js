import { colors } from '../constants/chartConfig'

const crosshairPlugin = theme => ({
  id: 'crosshairPlugin',
  crosshair: undefined,
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { left },
      scales: { y },
    } = chart

    ctx.lineWidth = 1
    ctx.strokeStyle = colors[theme].crosshairColor

    if (this.crosshair) {
      ctx.save()
      ctx.beginPath()
      this.crosshair.forEach(line => {
        ctx.moveTo(line.startX, line.startY)
        ctx.lineTo(line.endX, line.endY)
        ctx.stroke()
      })
      ctx.fillStyle = colors[theme].crosshairColor
      ctx.fillRect(0, this.crosshair[0].startY - 10, left, 20)
      ctx.font = 'Poppins'

      ctx.textAlign = 'center'
      ctx.fillStyle = colors[theme].crosshairTextColor
      ctx.fillText(
        y.getValueForPixel(this.crosshair[0].startY).toFixed(3),
        left / 2,
        this.crosshair[0].startY + 5,
      )
    }
  },
  afterEvent(chart, args) {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart

    const xCoor = args.event.x
    const yCoor = args.event.y

    ctx.lineWidth = 1
    ctx.strokeStyle = colors[theme].crosshairColor

    if (!args.inChartArea && this.crosshair) {
      this.crosshair = undefined
    } else if (args.inChartArea) {
      this.crosshair = [
        { startX: left, startY: yCoor, endX: right, endY: yCoor },
        { startX: xCoor, startY: top, endX: xCoor, endY: bottom },
      ]
    }
  },
})

export default crosshairPlugin
