import currenciesForChart from '../constants/currenciesForChart'

class TimelineObservable {
  constructor() {
    this.currency = Object.keys(currenciesForChart)[0]
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
