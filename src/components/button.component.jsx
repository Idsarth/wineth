import React from 'react'

const Button = (props) => {
  const { message, onClick, variant, disabled } = props
  return (
    <input
      disabled={disabled}
      type='button'
      value={message}
      className={`button ${disabled ? 'button-disabled' : ''} ${variant ? 'button-outline' : ''}`}
      onClick={onClick}
    />
  )
}

export default Button
