import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import ConversionResult from 'Components/Core/ConversionResult/ConversionResult'
import { ERROR_MESSAGE } from 'Components/Core/ConversionResult/ConversionResult.config'

describe('Conversion result component tests', () => {
  const successMockResult = 10
  const errorMockResult = -10
  const mockCurrency = 'AUD'

  it('should render a component', () => {
    render(<ConversionResult result={successMockResult} currency={mockCurrency} />)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('should throw error when result is negative', () => {
    expect(() =>
      render(<ConversionResult result={errorMockResult} currency={mockCurrency} />),
    ).toThrow(ERROR_MESSAGE)
  })

  it('should match a snapshot', () => {
    const ConversionResultComponent = render(
      <ConversionResult result={successMockResult} currency={mockCurrency} />,
    )
    expect(ConversionResultComponent).toMatchSnapshot()
  })
})
