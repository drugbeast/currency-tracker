import Layout from '../components/Layout'
import BankCard from '../pages/BankCard'
import Contato from '../pages/Contato'
import Home from '../pages/Home/Home'
import Timeline from '../pages/Timeline/Timeline'

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
      {
        path: paths.contato,
        element: <Contato />,
      },
    ],
  },
]
