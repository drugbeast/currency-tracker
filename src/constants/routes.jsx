import Loader from 'Components/Core/Loader/Loader'
import Layout from 'Components/Layout/Layout'
import Timeline from 'Pages/Timeline/Timeline'
import { lazy, Suspense } from 'react'

import { PATHS } from './constants'

const BankCard = lazy(() => import('Pages/BankCard/BankCard'))
const Home = lazy(() => import('Pages/Home/Home'))
const Contato = lazy(() => import('Pages/Contato/Contato'))

export const routes = [
  {
    path: PATHS.default,
    element: <Layout />,
    children: [
      {
        path: PATHS.timeline,
        element: <Timeline />,
      },
      {
        path: PATHS.bankCard,
        element: <BankCard />,
      },
      {
        path: PATHS.default,
        element: <Home />,
      },
    ],
  },
  {
    path: PATHS.default,
    element: (
      <Suspense fallback={<Loader />}>
        <Contato />
      </Suspense>
    ),
    children: [
      {
        path: PATHS.contato,
        element: <Contato />,
      },
    ],
  },
]
