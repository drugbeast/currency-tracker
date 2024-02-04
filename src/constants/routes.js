import Layout from "../components/Layout"
import Timeline from "../pages/Timeline"
import BankCard from "../pages/BankCard"
import Home from "../pages/Home/Home"
import Contato from "../pages/Contato"

export const paths = {
  default: '/', 
  timeline: 'timeline', 
  bankCard: 'bankCard',
  contato: 'contato'
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
        element: <Contato />
      }
    ],
  },
]