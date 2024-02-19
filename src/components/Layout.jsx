import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Banner from './Banner/Banner'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import LastUpdated from './LastUpdated/LastUpdated'
import Loader from './Loader/Loader'

function Layout() {
  return (
    <>
      <Header />
      <Banner />
      <LastUpdated />
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
