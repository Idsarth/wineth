import React from 'react'

// Import components
import SideBar from '../components/sidebar.component'
import Navbar from '../components/navbar.component'

export const Layout = (props) => {
  const { children } = props
  return (
    <>
      <div>
        <Navbar />
        <SideBar />
        <section>
          {children}
        </section>
      </div>
    </>
  )
}

export default Layout
