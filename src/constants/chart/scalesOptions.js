import { calculateMax, calculateMin } from 'Utils/calculateMinMax'

import { colors } from './chartColors'

export const scalesOptions = (theme) => ({
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
      color: colors[theme].axesTextColor,
    },
    ticks: {
      display: false,
    },
    min: (ctx) => calculateMin(ctx),
    max: (ctx) => calculateMax(ctx),
    grid: {
      display: false,
    },
  },
  y: {
    position: 'right',
    beginAtZero: true,
    ticks: {
      display: true,
      padding: window.innerWidth < 768 ? 30 : 50,
      font: {
        family: 'Poppins',
        weight: 400,
        size: 16,
      },
      color: colors[theme].axesTextColor,
      callback: (v) => v.toFixed(3),
    },
    min: (ctx) => calculateMin(ctx),
    max: (ctx) => calculateMax(ctx),
    grid: {
      display: true,
      color: colors[theme].gridLinesColor,
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
      color: colors[theme].axesTextColor,
    },
    ticks: { display: false },
    grid: {
      color: colors[theme].gridLinesColor,
    },
  },
})
