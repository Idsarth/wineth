import React from 'react'
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

const SideBar = () => {
  const { user } = useAuth()

  return (
    <aside className='sidebar'>
      <ul className='sidebar-list'>
        {options.map(opt => (
          <li key={opt.id}>
            <ListTile
              message={opt.message}
              routeName={
                opt.routeName === '/partners'
                  ? `${opt.routeName}/${decode(user.token).id}`
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
