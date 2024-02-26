import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Banner from './Banner/Banner'
import Loader from './Core/Loader/Loader'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import LastUpdated from './LastUpdated/LastUpdated'

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
