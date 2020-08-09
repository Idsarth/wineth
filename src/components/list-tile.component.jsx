import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const ListTile = (props) => {
    const { message, icon: Icon, routeName, dropdown } = props

    return (
        <Link to={routeName} className='list-tile'>
            <div className='list-tile-content'>
                <div>
                    {Icon}
                    <span>{message}</span>
                </div>
                {dropdown && (
                    <IoIosArrowForward className='list-tile-icon' />
                )}
            </div>
        </Link>
    )
}

export default ListTile
