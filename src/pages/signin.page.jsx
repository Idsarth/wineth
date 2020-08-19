import React, { useEffect, useState} from 'react'
import Ethereum from '@metamask/detect-provider'
import { Redirect } from 'react-router-dom'

// Import logo
import logo from '../static/img/logo.png'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import { useFetch } from '../hooks/useAxios'

// Import components
import Button from '../components/button.component'
import Error from '../components/error.component'
import Particle from '../components/particle.component'
import Loader from '../components/loader.component'

const SignInPage = () => {
  const { signIn, isLoggedIn } = useAuth()
  const [systemId, setSystemId] = useState('')
  const [accounts, setAccounts] = useState('')
  const [{ error: errorNetwork, isFetching, data }, execute] = useFetch({ url: '/auth/signin', method: 'POST' }, false)
  const [{ isFetching: isLoading, data: response }, load] = useFetch({ url: '/auth/withid/signin', method: 'POST' }, false)
  const [error, setError] = useState({hasError: false, message: ''})

  useEffect(() => {
    if (response?.status === 200) signIn({ id: systemId })
    if (response?.status === 400) setError({ hasError: true, message: 'System Id is not valid.' })
  }, [response])

  useEffect(() => {
    const detectProvider = async () => {
      const provider = await Ethereum()
      if (!provider) return setError({ hasError: true, message: 'Please install MetaMask!' })
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload())
  }
    detectProvider()
  }, [])

  useEffect(() => {
    if (errorNetwork) setError({ hasError: true, message: errorNetwork.toString() })
    if (data.status === 200 && data.accessToken) signIn({ token: data.accessToken, account: accounts, isActive: data.isActiveBucket })
  }, [errorNetwork, data])

  const onSubmit = () => {
    window.ethereum
      .request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        if (accounts.length === 0) setError({hasError: true, message: 'Please connect to Metamask.'})
        if (accounts[0] !== null) {
          setAccounts(accounts[0])
          execute({ wallet: accounts[0] })
        }
      })
  }

  const onSubmitSystemId = () => {
    if (!systemId) return setError({ hasError: true, message: 'Enter the system id.' })
    load({ id: systemId })
  }
  if (data?.status === 400) return <Redirect to='/sign-up' />
  if (isLoggedIn) return <Redirect to='/'/>

  return (
    <div className='l-form'>
      <form className='form'>
        <div className='form-img'>
          <img src={logo} alt='Logo Wineth'/>
        </div>
        <input
          className='input bottom'
          placeholder='System ID'
          onChange={setSystemId}
        />
        {error.hasError && <Error className='bottom' message={error.message}/>}
        {isFetching || isLoading ? ( <Loader/> ) : (
          <>
            <Button variant message='Login con Metamask' onClick={onSubmit} />
            <Button onClick={onSubmitSystemId} message='Ingresar' />
          </>
        )}
      </form>
      <Particle
        params={{
          "particles": {
            "number": {
              "value": 50
            },
            "size": {
              "value": 3
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            }
          }
        }}
      />
    </div>
  )
}

export default SignInPage
