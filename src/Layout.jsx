import { Outlet } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'


export function Layout() {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

