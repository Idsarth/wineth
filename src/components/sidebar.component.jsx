import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside className='sidebar'>
      <ul className='sidebar-list'>
        <li className='sidebar-item'>
          <Link to='/'>Home</Link>
        </li>
        
      </ul>
    </aside>
  )
}

export default SideBar