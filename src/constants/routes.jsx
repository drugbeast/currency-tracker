import { lazy, Suspense } from 'react'

import Layout from '../components/Layout'
import Loader from '../components/Loader/Loader'
import Timeline from '../pages/Timeline/Timeline'

const BankCard = lazy(() => import('../pages/BankCard/BankCard'))
const Home = lazy(() => import('../pages/Home/Home'))
const Contato = lazy(() => import('../pages/Contato/Contato'))

export const paths = {
  default: '/',
  timeline: 'timeline',
  bankCard: 'bankCard',
  contato: 'contato',
}

export const routes = [
  {
    path: paths.default,
    element: <Layout />,
    children: [
      {
        path: paths.timeline,
        element: <Timeline />,
      },
      {
        path: paths.bankCard,
        element: <BankCard />,
      },
      {
        path: paths.default,
        element: <Home />,
      },
    ],
  },
  {
    path: paths.default,
    element: (
      <Suspense fallback={<Loader />}>
        <Contato />
      </Suspense>
    ),
    children: [
      {
        path: paths.contato,
        element: <Contato />,
      },
    ],
  },
]
