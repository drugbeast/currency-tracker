import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '../constants/routes'

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

export default App
