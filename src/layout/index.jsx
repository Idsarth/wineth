import React, { } from 'react'
import { Redirect } from 'react-router-dom'

// Import components
import SideBar from '../components/sidebar.component'
import Navbar from '../components/navbar.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

export const Layout = (props) => {
  const { children } = props
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Redirect to='/sign-in' />
  return (
    <div className='layout'>
      <Navbar />
      <SideBar />
      <section className='layout-content'>
        {children}
      </section>
    </div>
  )
}

export default Layout
