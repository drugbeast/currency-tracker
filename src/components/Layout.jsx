import { Outlet } from 'react-router-dom'

import Banner from './Banner/Banner'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import LastUpdated from './LastUpdated/LastUpdated'

function Layout() {
  return (
    <>
      <Header />
      <Banner />
      <LastUpdated />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
