import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import Cross from 'Components/Core/Cross/Cross'

describe('Cross Component', () => {
  const mockOnModalClose = jest.fn()
  it('should render the component', () => {
    render(<Cross onModalClose={mockOnModalClose} />)
    const crossElement = screen.getByTestId('cross')

    expect(crossElement).toBeInTheDocument()
    expect(crossElement).toHaveClass('cross')
  })

  it('should call onModalClose when clicked on the cross', () => {
    render(<Cross onModalClose={mockOnModalClose} />)
    const crossElement = screen.getByTestId('cross')

    fireEvent.click(crossElement)

    expect(mockOnModalClose).toHaveBeenCalledTimes(1)
  })

  it('should match a snapshot', () => {
    const CrossComponent = render(<Cross onModalClose={mockOnModalClose} />)
    expect(CrossComponent).toMatchSnapshot()
  })
})
