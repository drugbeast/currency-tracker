import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import CurrencyCard from 'Components/Home/CurrencyCard/CurrencyCard'

describe('Currency card component', () => {
  const setCardClicked = jest.fn()
  const setShow = jest.fn()
  const symbols = ['AUD', 'BTC', 'CAD', 'USD', 'EUR', 'TRY', 'ARS', 'KRW', 'JPY']
  const mockCurrency = 'AUD'
  const mockRate = 1

  const renderComponent = (symbol = mockCurrency) => {
    render(
      <CurrencyCard
        setCardClicked={setCardClicked}
        setShow={setShow}
        symbol={symbol}
        rate={mockRate}
      />,
    )
  }

  it('should render the component', () => {
    renderComponent()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('should call callbacks after card was clicked', () => {
    renderComponent()
    const card = screen.getByRole('presentation')
    fireEvent.click(card)
    expect(setCardClicked).toHaveBeenCalledTimes(1)
    expect(setShow).toHaveBeenCalledTimes(1)
  })

  it('should match snapshot', () => {
    const CurrencyCardComponent = renderComponent()
    expect(CurrencyCardComponent).toMatchSnapshot()
  })

  it(`should render cards with all currencies's svgs`, () => {
    symbols.forEach((symbol) => {
      renderComponent(symbol)
      expect(screen.getAllByRole('presentation').length).toBeGreaterThan(0)
    })
  })
})
