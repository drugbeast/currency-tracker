import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import Modal from 'Components/Modals/Modal/Modal'
import { MODAL_TYPES } from 'Constants/constants'

describe('Modal', () => {
  const mockCloseModal = jest.fn()
  const mockCurrency = {
    symbol: 'USD',
    rate: 1.2,
  }
  const mockRates = [{ rate: 1.3, symbol: 'EUR' }]

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders Converter component when type is "converter"', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))
    render(<Modal type={MODAL_TYPES.converter} currency={mockCurrency} />)
    const converterComponent = screen.getByTestId('converter-component')
    expect(converterComponent).toBeInTheDocument()
  })

  test('renders Edit component when type is "edit"', () => {
    render(<Modal type={MODAL_TYPES.edit} />)
    const editComponent = screen.getByTestId('edit-component')
    expect(editComponent).toBeInTheDocument()
  })

  test('renders Message component when type is "message"', () => {
    render(<Modal type={MODAL_TYPES.message} />)
    const messageComponent = screen.getByTestId('message-component')
    expect(messageComponent).toBeInTheDocument()
  })

  test('renders Add component when type is "add"', () => {
    render(<Modal type={MODAL_TYPES.add} />)
    const addComponent = screen.getByTestId('add-component')
    expect(addComponent).toBeInTheDocument()
  })

  test('calls onModalClose when the Close button is clicked', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))
    render(
      <Modal
        type={MODAL_TYPES.converter}
        onModalClose={mockCloseModal}
        currency={mockCurrency}
      />,
    )
    const closeButton = screen.getByTestId('cross')
    fireEvent.click(closeButton)
    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  test('calls onModalClose when the Escape key is pressed', () => {
    localStorage.setItem('rates', JSON.stringify(mockRates))
    render(
      <Modal
        type={MODAL_TYPES.converter}
        onModalClose={mockCloseModal}
        currency={mockCurrency}
      />,
    )
    const modalWindow = screen.getByTestId('modal-window')
    fireEvent.keyDown(modalWindow, { key: 'Escape' })
    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })
})
