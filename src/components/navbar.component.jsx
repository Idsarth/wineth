import React from 'react'
import { Link } from 'react-router-dom'

// Import components
import DropDown from './dropdown.component'

const Navbar = () => {
  return (
    <header className='navbar'>
      <nav className='nav'>
        <div className='nav-brand'>
          <p>LOGO</p>
        </div>
        {/* <ul className='nav-list'>
          <li>
            
          </li>
        </ul> */}
        <DropDown />
      </nav>
    </header>
  )
}

export default Navbar
