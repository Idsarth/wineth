import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { decode } from 'jsonwebtoken'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Import logo
import logo from '../static/img/logo.png'

// Import components
import DropDown from './dropdown.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const [copy, setCopy] = useState(false)
  const { user } = useAuth()
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
            </ol>
          </div>
          <div className='nav-brand'>
            <Link to='/'>
              <img src={logo} alt='Logo wineth' />
            </Link>
          </div>
          {user?.isActive && (
            <ul className='nav-referer'>
              <li className='nav-link'>http://localhost:3000/sign-up/{decode(user?.token).id}</li>
              <CopyToClipboard onCopy={() => setCopy(true)} text={`http://localhost:3000/sign-up/${decode(user?.token).id}`}>
                <span className='nav-copy'>Copiar</span>
              </CopyToClipboard>
            </ul>
          )}
        </div>
        <DropDown />
      </nav>
    </header>
  )
}

export default Navbar
