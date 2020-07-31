import React from 'react'

// Import components
import SideBar from '../components/sidebar.component'
import Navbar from '../components/navbar.component'

export const Layout = (props) => {
  const { children } = props
  return (
    <>
      <div className='layout'>
        <Navbar />
        <SideBar />
        <section className='layout-content'>
          {children}
        </section>
      </div>
    </>
  )
}

export default Layout
