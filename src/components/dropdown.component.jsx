import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const DropDown = () => {
  const { signOut, user } = useAuth()
  const [show, setShow] = useState(false)

  const handleLogout = () => signOut()
  const toggle = () => setShow(prevState => !prevState)

  return (
    <div className='dropdown'>
      <div onClick={toggle} className='dropdown-user'>
        <div>
          <p>{user?.username}</p>
          <IoMdArrowDropdown className='dropdown-icon' />
        </div>
      </div>

      {show && (
        <ul className='dropdown-list'>
          <li className='dropdown-item'>
            <Link to='#'>Profile</Link>
          </li>
          <li className='dropdown-item'>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default DropDown
