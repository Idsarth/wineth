import React from 'react'
import { Redirect } from 'react-router-dom'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const SignInPage = () => {
  const { signIn, isLoggedIn } = useAuth()
  const handle = () => signIn({ username: 'Idsarth', email: 'Idsarth@gmail.com', token: 'ESTEESUNTOKENSUPERSEGURO' })

  if (isLoggedIn) return <Redirect to='/' />

  return (
    <div>
      <p>SignInPage</p>
      <button onClick={handle}>
        Sign In
      </button>
    </div>
  )
}

export default SignInPage
