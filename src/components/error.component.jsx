import React from 'react'
import { IoMdWarning } from 'react-icons/io'

const Error = (props) => {
  const { message, className } = props
  return (
    <div className={`error ${className ? className : ''}`}>
      <IoMdWarning className='error-icon' />
      <span className='error-message'>{message}</span>
    </div>
  )
}

export default Error
