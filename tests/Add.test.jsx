import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import Add from 'Components/Modals/Add/Add'
import TimelineObservable from 'Utils/TimelineObservable'

jest.mock('axios')

describe('Add Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the form correctly', () => {
    render(<Add />)

    expect(screen.getByText('Add')).toBeInTheDocument()
    expect(screen.getByLabelText('Open')).toBeInTheDocument()
    expect(screen.getByLabelText('High')).toBeInTheDocument()
    expect(screen.getByLabelText('Close')).toBeInTheDocument()
    expect(screen.getByLabelText('Low')).toBeInTheDocument()
    expect(screen.getByText('add')).toBeInTheDocument()
  })

  it('should update input values correctly', () => {
    render(<Add />)

    fireEvent.change(screen.getByLabelText('Open'), { target: { value: '10' } })
    fireEvent.change(screen.getByLabelText('High'), { target: { value: '20' } })
    fireEvent.change(screen.getByLabelText('Close'), { target: { value: '15' } })
    fireEvent.change(screen.getByLabelText('Low'), { target: { value: '5' } })

    expect(screen.getByLabelText('Open').value).toBe('10')
    expect(screen.getByLabelText('High').value).toBe('20')
    expect(screen.getByLabelText('Close').value).toBe('15')
    expect(screen.getByLabelText('Low').value).toBe('5')
  })

  it('should handle form submission correctly', async () => {
    render(<Add />)

    TimelineObservable.dataset = [
      {
        id: '1',
        date: '26-01-2024',
        open: 1.09085,
        high: 1.07821,
        close: 1.06052,
        low: 1.02978,
      },
      {
        id: '2',
        date: '27-01-2024',
        open: 1.09085,
        high: 1.07821,
        close: 1.06052,
        low: 1.02978,
      },
    ]

    const mockPost = axios.post.mockResolvedValue({ data: {} })

    fireEvent.change(screen.getByLabelText('Open'), { target: { value: '10' } })
    fireEvent.change(screen.getByLabelText('High'), { target: { value: '20' } })
    fireEvent.change(screen.getByLabelText('Close'), { target: { value: '15' } })
    fireEvent.change(screen.getByLabelText('Low'), { target: { value: '5' } })

    fireEvent.click(screen.getByText('add'))

    expect(mockPost).toHaveBeenCalledWith(
      'https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/aud',
      expect.objectContaining({
        open: 10,
        high: 20,
        close: 15,
        low: 5,
        date: '28-03-2024',
      }),
    )
  })
})
