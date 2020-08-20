import React from 'react'
import logo from '../static/img/logo.png'

// Import components
import Button from '../components/button.component'

const ErrorPage = () => {
  const handleSignOut = () => localStorage.clear()
  return (
    <div className='l-error'>
      <img src={logo} alt='Wineth' />
      <p>Opppsss, ocurrio un error...</p>
      <a href='/sign-in'>
        <Button message='Sacame de aqui' onClick={handleSignOut} />
      </a>
    </div>
  )
}

export default ErrorPage
