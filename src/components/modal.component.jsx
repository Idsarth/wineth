import React from 'react'
import { MdClose } from 'react-icons/md'

const Modal = (props) => {
  const { children, onClosed, className } = props
  return (
    <div className={`overlay ${className ? className : ''}`}>
      <MdClose className='modal-close' onClick={onClosed} />
      {children}
    </div>
  )
}

export default Modal
