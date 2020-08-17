import React, {useEffect, useState} from 'react'
import Ethereum from '@metamask/detect-provider'
import { Redirect } from 'react-router-dom'

// Import logo
import logo from '../static/img/logo.png'

// Import hooks
import { useAuth } from '../hooks/useAuth'

// Import components
import Button from '../components/button.component'
import Error from '../components/error.component'
import Particle from '../components/particle.component'

const SignInPage = () => {
  const { signIn, isLoggedIn } = useAuth()
  const [systemId, setSystemId] = useState('')
  const [error, setError] = useState({ hasError: false, message: 'Por favor instale MetaMask.' })
  const handle = () => signIn({ username: 'Idsarth', email: 'Idsarth@gmail.com', token: 'ESTEESUNTOKENSUPERSEGURO' })

  useEffect(() => {
    Ethereum()
      .then(response => console.log(response))
      .catch(error => setError({ hasError: true, message: 'Por favor instale MetaMask.'}))
  }, [])
  if (isLoggedIn) return <Redirect to='/' />
  return (
    <div className='l-signIn'>
      <form className='form'>
        <div className='form-img'>
          <img src={logo} alt='Logo Wineth' />
        </div>
        <input
          className='input bottom'
          placeholder='System ID'
          onChange={setSystemId}
        />
        <Error className='bottom' message={error.message} />
        <Button
          variant
          message='Login con Metamask'
          onClic={() => {}}
        />
        <Button
          onClick={handle}
          message='Registrar'
        />

      </form>
      <Particle />
    </div>
  )
}

export default SignInPage
