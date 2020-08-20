import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const ListTile = (props) => {
    const { message, icon: Icon, routeName, dropdown, onClick } = props

    return (
        <Link onClick={onClick} to={routeName} className='list-tile'>
            <div className='list-tile-content'>
                <div>
                    {Icon}
                    <span>{message}</span>
                </div>
                {dropdown && (
                    <IoIosArrowForward className='list-tile-icon icon' />
                )}
            </div>
        </Link>
    )
}

export default ListTile
