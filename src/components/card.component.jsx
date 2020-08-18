import React from 'react'

const Card = (props) => {
  const { logo: Logo, total, title } = props
  return (
    <div className='card'>
      {Logo}
      <div>
        <span>{title}</span>
        <span>{total}</span>
      </div>
    </div>
  )
}

export default Card
