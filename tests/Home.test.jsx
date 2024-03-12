import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import Home from 'Pages/Home/Home'

describe('Home component', () => {
  it('should render the component', () => {
    render(<Home />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('should match a snapshot', () => {
    const HomeComponent = render(<Home />)
    expect(HomeComponent).toMatchSnapshot()
  })
})
