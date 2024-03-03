import { CURRENCIES_FOR_CHART } from 'Constants/constants'

class TimelineObservable {
  constructor() {
    this.currency = Object.keys(CURRENCIES_FOR_CHART)[0]
    this.dataset = []
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  notify(currency, dataset) {
    if (currency) {
      this.currency = currency
    }
    if (dataset) {
      this.dataset = dataset
    }
    this.observers.forEach((observer) => observer.update(this))
  }
}

export default new TimelineObservable()
