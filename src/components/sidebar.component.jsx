import React, {useEffect, useState} from 'react'
import { IoIosHome } from 'react-icons/io'
import { MdAccountBalance } from 'react-icons/md'
import { decode } from 'jsonwebtoken'


// Import components
import ListTile from './list-tile.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const options = [
  {
    id: 1,
    routeName: '/',
    message: 'Dashboard',
    icon: <IoIosHome className='list-tile-icon' />
  },
  {
    id: 2,
    routeName: `/partners`,
    message: 'Partners',
    icon: <MdAccountBalance className='list-tile-icon' />
  },
]

const SideBar = (props) => {
  const { user } = useAuth()

  return (
    <aside className={`sidebar ${props.active ? 'sidebar-show' : ''}`}>
      <ul className='sidebar-list'>
        {options.map(opt => (
          <li key={opt.id}>
            <ListTile
              onClick={() => props.onSize(!props.active)}
              message={opt.message}
              routeName={
                opt.routeName === '/partners'
                  ? `${opt.routeName}/${user?.token ? decode(user.token).id : user.id }`
                  : opt.routeName
              }
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
