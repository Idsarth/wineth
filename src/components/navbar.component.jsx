import React, { useState } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { decode } from 'jsonwebtoken'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Import logo
import logo from '../static/img/logo.png'

// Import components
import DropDown from './dropdown.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const Navbar = (props) => {
  const { user } = useAuth()
  const [_,setCopy] = useState(false)

  return (
    <header className='navbar'>
      <nav className='nav'>
        <div className='nav-left'>
          <div>
            <div onClick={() => props.onSize(!props.size)}>
              <IoIosMenu className='nav-menu' />
            </div>
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
              <li className='nav-link'>https://wineth.live/sign-up/{decode(user?.token).id}</li>
              <CopyToClipboard onCopy={() => setCopy(true)} text={`https://wineth.live/sign-up/${user?.token ? decode(user?.token)?.id : user?.id }`}>
                <span className='nav-copy'>Copiar</span>
              </CopyToClipboard>
            </ul>
          )}
          {user?.isActive && (
            <ul className='nav-referer-mobile'>
              <CopyToClipboard onCopy={() => setCopy(true)} text={`https://wineth.live/sign-up/${user?.token ? decode(user?.token)?.id : user?.id }`}>
                <span className='nav-copy'>Copiar link</span>
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
