import { RATES_FOR_TESTS } from 'Constants/constants'

export const getInitialValueForCardsCurrencies = () => {
  const currenciesFromLS = localStorage.getItem('rates')
  if (currenciesFromLS != null && !window.Cypress) {
    return JSON.parse(currenciesFromLS)
  }
  if (window.Cypress) {
    return RATES_FOR_TESTS
  }
  return []
}
