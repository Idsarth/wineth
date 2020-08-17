import React from 'react'

const Button = (props) => {
  const { message, onClick, variant } = props
  return (
    <input
      type='button'
      value={message}
      className={`button ${variant && 'button-outline'}`}
      onClick={onClick}
    />
  )
}

export default Button
