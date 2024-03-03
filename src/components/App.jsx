import { routes } from 'Constants/routes'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import Theme from './Theme'

function App() {
  return (
    <Theme>
      <RouterProvider router={createHashRouter(routes)} />
    </Theme>
  )
}

export default App
