import { SPREAD } from 'Constants/constants'

export const calculateMin = (ctx) => {
  const { data } = ctx.chart.data.datasets[0]
  let min = data[0].open
  data.forEach((item) => {
    const value = Math.min.apply(
      null,
      Object.values(item).filter((v) => item.id !== v && !Number.isNaN(Number(v))),
    )
    if (value < min) {
      min = value
    }
  })
  return min - min * SPREAD
}

export const calculateMax = (ctx) => {
  const { data } = ctx.chart.data.datasets[0]
  let max = data[0].open
  data.forEach((item) => {
    const value = Math.max.apply(
      null,
      Object.values(item).filter((v) => item.id !== v && !Number.isNaN(Number(v))),
    )
    if (value > max) {
      max = value
    }
  })
  return max + max * SPREAD
}
