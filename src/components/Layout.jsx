import { Outlet } from 'react-router-dom'

import Banner from './Banner/Banner'
import Footer from './Footer/Footer'
import Header from './Header/Header'

function Layout() {
  return (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
