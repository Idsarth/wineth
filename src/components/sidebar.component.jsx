import React from 'react'
import { IoIosHome } from 'react-icons/io'
import { MdAccountBalance } from 'react-icons/md';


// Import components
import ListTile from './list-tile.component'

const options = [
  {
    id: 1,
    routeName: '/',
    message: 'Dashboard',
    icon: <IoIosHome className='list-tile-icon' />
  },
  {
    id: 2,
    routeName: '/partners/1',
    message: 'Partners',
    icon: <MdAccountBalance className='list-tile-icon' />
  },
]

const SideBar = () => {
  return (
    <aside className='sidebar'>
      <ul className='sidebar-list'>
        {options.map(opt => (
          <li key={opt.id}>
            <ListTile
              message={opt.message}
              routeName={opt.routeName}
              icon={opt.icon}
              dropdown
            />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideBar
