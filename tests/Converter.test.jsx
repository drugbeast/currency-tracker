import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import Converter from 'Components/Modals/Converter/Converter'

jest.spyOn(Storage.prototype, 'setItem')

describe('Converter Component', () => {
  const mockCurrency = {
    symbol: 'USD',
    rate: 1.2,
  }
  const mockRates = [{ rate: 1.3, symbol: 'EUR' }]
  const mockConversionResult = '108.333 EUR'
  const mockConversionAmount = '100'
  const mockConversionCurrency = 'EUR'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))

    render(<Converter currency={mockCurrency} />)
    const titleElement = screen.getByText('Converter')
    const modalWrapperElement = screen.getByTestId('converter-modal-wrapper')
    const inputElement = screen.getByTestId('converter-input')
    const selectElement = screen.getByTestId('converter-select')

    expect(titleElement).toBeInTheDocument()
    expect(modalWrapperElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(selectElement).toBeInTheDocument()
  })

  it('should update amount and selected currency on input and select change', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))

    render(<Converter currency={mockCurrency} />)
    const inputElement = screen.getByTestId('converter-input')
    const selectElement = screen.getByTestId('converter-select')

    fireEvent.change(inputElement, { target: { value: mockConversionAmount } })
    fireEvent.change(selectElement, { target: { value: mockConversionCurrency } })

    expect(inputElement.value).toBe(mockConversionAmount)
    expect(selectElement.value).toBe(mockConversionCurrency)
  })

  it('should calculate and display the conversion result correctly', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))

    render(<Converter currency={mockCurrency} />)
    const inputElement = screen.getByTestId('converter-input')
    const selectElement = screen.getByTestId('converter-select')
    const conversionResultElement = screen.getByTestId('conversion-result')

    fireEvent.change(inputElement, { target: { value: mockConversionAmount } })
    fireEvent.change(selectElement, { target: { value: mockConversionCurrency } })

    expect(conversionResultElement).toHaveTextContent(mockConversionResult)
  })

  it('should match a snapshot', () => {
    const ConverterComponent = render(<Converter currency={mockCurrency} />)
    expect(ConverterComponent).toMatchSnapshot()
  })
})
