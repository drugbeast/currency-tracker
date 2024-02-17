import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '../constants/routes'
import Theme from './Theme'

function App() {
  return (
    <Theme>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Theme>
  )
}

export default App
