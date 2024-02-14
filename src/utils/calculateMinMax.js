export const calculateMin = ctx => {
  const { data } = ctx.chart.data.datasets[0]
  let min = data[0].open
  data.forEach(item => {
    const value = Math.min.apply(
      null,
      Object.values(item).filter(v => !Number.isNaN(Number(v))),
    )
    if (value < min) {
      min = value
    }
  })
  return min - min * 0.015
}

export const calculateMax = ctx => {
  const { data } = ctx.chart.data.datasets[0]
  let max = data[0].open
  data.forEach(item => {
    const value = Math.max.apply(
      null,
      Object.values(item).filter(v => !Number.isNaN(Number(v))),
    )
    if (value > max) {
      max = value
    }
  })
  return max + max * 0.015
}
