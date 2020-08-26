import React from 'react'
import { IoIosHome, IoIosRocket, IoIosSend } from 'react-icons/io'
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
  {
    id: 3,
    routeName: `/profits`,
    message: 'Profits',
    icon: <IoIosRocket className='list-tile-icon' />
  },
  {
    id: 4,
    routeName: `/donations`,
    message: 'Donations',
    icon: <IoIosSend className='list-tile-icon' />
  },
]

const SideBar = (props) => {
  const { user } = useAuth()

  return (
    <aside className={`sidebar ${props.active ? 'sidebar-show' : ''}`}>
      <ul className='sidebar-list'>
        {options.map(opt => {
          let routeName = '/'
          if (opt.routeName === '/partners') routeName = `${opt.routeName}/${user?.token ? decode(user?.token)?.id : user?.id }`
          else if (opt.routeName === '/profits') routeName = `${opt.routeName}/${user?.token ? decode(user?.token)?.id : user?.id }`
          else if (opt.routeName === '/donations') routeName = `${opt.routeName}/${user?.token ? decode(user?.token)?.id : user?.id }`
          else routeName = opt.routeName

          return (
            <li key={opt.id}>
              <ListTile
                onClick={() => props.onSize(!props.active)}
                message={opt.message}
                routeName={routeName}
                icon={opt.icon}
                dropdown
              />
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default SideBar
