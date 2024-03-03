export const CACHING_PERIOD = 8_640_000

export const SPREAD = 0.015

export const THEMES = {
  light: 'light',
  dark: 'dark',
}

export const MODAL_TYPES = {
  converter: 'converter',
  edit: 'edit',
  add: 'add',
  message: 'message',
}

export const CURRENCIES_FIRST_FORM = [
  { id: 1, symbol: 'AUD', name: 'Australian Dollar' },
  { id: 2, symbol: 'BTC', name: 'Bitcoin' },
  { id: 3, symbol: 'ARS', name: 'Argentine Peso' },
  { id: 4, symbol: 'CAD', name: 'Canadian Dollar' },
  { id: 5, symbol: 'USD', name: 'Commercial Dollar' },
  { id: 6, symbol: 'EUR', name: 'Euro' },
  { id: 7, symbol: 'TRY', name: 'Libra' },
  { id: 8, symbol: 'KRW', name: 'Won' },
  { id: 9, symbol: 'JPY', name: 'Yen' },
]

export const CURRENCIES_SECOND_FORM = {
  AUD: 'Australian Dollar',
  BTC: 'Bitcoin',
  ARS: 'Argetine Peso',
  CAD: 'Canadian Dollar',
  USD: 'Commercial Dollar',
  EUR: 'Euro',
  TRY: 'Libra',
  KRW: 'Won',
  JPY: 'Yen',
}

export const CURRENCIES_FOR_CHART = {
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
}

export const BANKS = [
  {
    name: 'Belagroprombank',
    lat: 53.8936184,
    lng: 27.4814545,
    currencies: {
      AUD: 'Australian Dollar',
      ARS: 'Argentine Peso',
      CAD: 'Canadian Dollar',
      USD: 'Commercial Dollar',
      EUR: 'Euro',
    },
  },
  {
    name: 'BSB Bank',
    lat: 53.8792456,
    lng: 27.4930467,
    currencies: {
      BTC: 'Bitcoin',
      ARS: 'Argentine Peso',
      KRW: 'Won',
      JPY: 'Yen',
    },
  },
  {
    name: 'Status Bank',
    lat: 53.8663586,
    lng: 27.4484415,
    currencies: {
      CAD: 'Canadian Dollar',
      USD: 'Commercial Dollar',
      EUR: 'Euro',
    },
  },
  {
    name: 'Alpha-Bank',
    lat: 53.9204908,
    lng: 27.408525,
    currencies: {
      AUD: 'Australian Dollar',
      BTC: 'Bitcoin',
      ARS: 'Argentine Peso',
      CAD: 'Canadian Dollar',
      TRY: 'Libra',
      KRW: 'Won',
    },
  },
  {
    name: 'Bank RRB',
    lat: 53.9432613,
    lng: 27.55076,
    currencies: {
      EUR: 'Euro',
      TRY: 'Libra',
      KRW: 'Won',
      JPY: 'Yen',
    },
  },
  {
    name: 'Bank Dabrabyt',
    lat: 53.9492054,
    lng: 27.5992096,
    currencies: {
      KRW: 'Won',
      JPY: 'Yen',
    },
  },
  {
    name: 'Paritetbank',
    lat: 53.9220261,
    lng: 27.5414094,
    currencies: {
      AUD: 'Australian Dollar',
      BTC: 'Bitcoin',
      USD: 'Commercial Dollar',
      EUR: 'Euro',
    },
  },
  {
    name: 'Belarusbank',
    lat: 53.89237,
    lng: 27.5495003,
    currencies: {
      AUD: 'Australian Dollar',
      BTC: 'Bitcoin',
      ARS: 'Argentine Peso',
      JPY: 'Yen',
    },
  },
  {
    name: 'Belinvestbank',
    lat: 53.8922081,
    lng: 27.545108,
    currencies: {
      AUD: 'Australian Dollar',
      BTC: 'Bitcoin',
      ARS: 'Argentine Peso',
      CAD: 'Canadian Dollar',
      USD: 'Commercial Dollar',
      EUR: 'Euro',
      TRY: 'Libra',
      KRW: 'Won',
      JPY: 'Yen',
    },
  },
  {
    name: 'Priorbank',
    lat: 53.9192511,
    lng: 27.5476059,
    currencies: {
      BTC: 'Bitcoin',
      ARS: 'Argentine Peso',
      USD: 'Commercial Dollar',
      EUR: 'Euro',
      JPY: 'Yen',
    },
  },
]

export const PATHS = {
  default: '/',
  timeline: 'timeline',
  bankCard: 'bankCard',
  contato: 'contato',
}

export const ENVS = {
  currencybeacon_api_key: process.env.REACT_APP_CURRENCYBEACON_API_KEY,
  currencybeacon_request: process.env.REACT_APP_CURRENCYBEACON_REQUEST,
  maptiler_api_key: process.env.REACT_APP_MAPTILER_API_KEY,
  mockapi_request: process.env.REACT_APP_MOCKAPI_REQUEST,
}

export const MINSK_COORDINATES = { lng: 27.54949, lat: 53.891382 }

export const RATES_FOR_TESTS = [
  {
    symbol: 'AUD',
    rate: 1.53289419,
  },
  {
    symbol: 'KRW',
    rate: 1331.42229106,
  },
  {
    symbol: 'USD',
    rate: 1,
  },
  {
    symbol: 'ARS',
    rate: 842.57777129,
  },
  {
    symbol: 'BTC',
    rate: 1.61e-5,
  },
  {
    symbol: 'JPY',
    rate: 150.12546675,
  },
  {
    symbol: 'TRY',
    rate: 31.3410334,
  },
  {
    symbol: 'EUR',
    rate: 0.92260433,
  },
  {
    symbol: 'CAD',
    rate: 1.35655384,
  },
]

export const SCROLL_VALUE = 80

export const MARKER_COLOR = '#ff0000'
