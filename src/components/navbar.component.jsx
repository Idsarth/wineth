import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosMenu } from 'react-icons/io'

// Import logo
import logo from '../static/img/logo.png'

// Import components
import DropDown from './dropdown.component'

const Navbar = () => {
  return (
    <header className='navbar'>
      <nav className='nav'>
        <div className='nav-left'>
          <div>
            <ol className='nav-breadcrumb'>
              <li>
                <Link to='/'>Dashboard</Link>
              </li>
              <span>/</span>
              <li>
                <Link to='/'>Profile</Link>
              </li>
            </ol>
          </div>
          <div className='nav-brand'>
            <Link to='/'>
              <img src={logo} alt='Logo wineth' />
            </Link>
          </div>
        </div>
        <DropDown />
      </nav>
    </header>
  )
}

export default Navbar
