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
          <ul>
            <li>http://localhost/sign-up/{decode(user?.token).id}</li>
            {/*<CopyToClipboard onCopy={() => setCopy(true)} text={`http://localhost/sign-up/${decode(user?.token).id}`}>*/}
            {/*  copiar*/}
            {/*</CopyToClipboard>*/}
          </ul>
        </div>
        <DropDown />
      </nav>
    </header>
  )
}

export default Navbar
