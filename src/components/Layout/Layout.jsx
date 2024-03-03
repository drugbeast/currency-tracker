import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorBoundary from '../Core/ErrorBoundary/ErrorBoundary'
import Loader from '../Core/Loader/Loader'
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
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <main>
            <Outlet />
          </main>
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
