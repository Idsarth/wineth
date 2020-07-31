import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside className='sidebar'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        
      </ul>
    </aside>
  )
}

export default SideBar