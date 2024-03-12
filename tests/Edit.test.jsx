import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import Edit from 'Components/Modals/Edit/Edit'

jest.mock('axios')

describe('Edit', () => {
  test('should handle form submission', async () => {
    const mockResponse = { data: {} }
    axios.put.mockResolvedValue(mockResponse)

    render(<Edit />)
    const dayInput = screen.getByTestId('timeline-edit-day-input')
    const openInput = screen.getByTestId('timeline-edit-open-input')
    const highInput = screen.getByTestId('timeline-edit-high-input')
    const form = screen.getByTestId('timeline-edit-form')

    fireEvent.change(dayInput, { target: { value: '1' } })
    fireEvent.change(openInput, { target: { value: '100' } })
    fireEvent.change(highInput, { target: { value: '200' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1)
    })
  })

  test('should update dataset when input values change', () => {
    render(<Edit />)
    const openInput = screen.getByTestId('timeline-edit-open-input')
    const highInput = screen.getByTestId('timeline-edit-high-input')

    fireEvent.change(openInput, { target: { value: '100' } })
    fireEvent.change(highInput, { target: { value: '200' } })
  })
})
