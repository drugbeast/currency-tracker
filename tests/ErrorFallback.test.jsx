import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import ErrorFallback from 'Components/Core/ErrorFallback/ErrorFallback'

describe('ErrorFallback', () => {
  test('renders error message', () => {
    const errorMessage = 'Oops... Something went wrong!'
    render(<ErrorFallback message={errorMessage} />)

    const messageElement = screen.getByText(errorMessage)
    expect(messageElement).toBeInTheDocument()
  })

  test('does not render reset button for non-negative number error', () => {
    const errorMessage = 'Oops... Non-Negative Number!'
    render(<ErrorFallback message={errorMessage} />)

    const resetButton = screen.queryByText('reset')
    expect(resetButton).not.toBeInTheDocument()
  })

  test('renders reset button for negative number error', () => {
    const errorMessage =
      'Oops... Negative Number! Please, remove the "-" sign and click "reset".'
    render(<ErrorFallback message={errorMessage} />)

    const resetButton = screen.getByText('reset')
    expect(resetButton).toBeInTheDocument()
  })

  test('calls resetError function when reset button is clicked', () => {
    const resetErrorMock = jest.fn()
    const errorMessage =
      'Oops... Negative Number! Please, remove the "-" sign and click "reset".'
    render(<ErrorFallback message={errorMessage} resetError={resetErrorMock} />)

    const resetButton = screen.getByText('reset')
    fireEvent.click(resetButton)

    expect(resetErrorMock).toHaveBeenCalledTimes(1)
  })
})
