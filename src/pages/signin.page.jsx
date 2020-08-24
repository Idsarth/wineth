import React, { useEffect, useState} from 'react'
import Ethereum from '@metamask/detect-provider'
import { Redirect } from 'react-router-dom'
import Web3 from 'web3'

// Import layout
import SeoLayout from '../layout/seo.layout'

// Import logo
import logo from '../static/img/logo.png'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import { useFetch } from '../hooks/useAxios'
import { useBrowser } from '../hooks/useBrowser'

// Import components
import Button from '../components/button.component'
import Error from '../components/error.component'
import Particle from '../components/particle.component'
import Loader from '../components/loader.component'

const SignInPage = () => {
  const { signIn, isLoggedIn } = useAuth()
  const { isMobile } = useBrowser()
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
  }
    detectProvider()
  }, [])

  useEffect(() => {
    alert(`error => ${errorNetwork.toString()}`)
    alert(`data => ${data?.status} ${data?.message} ${JSON.stringify(data)}`)
  }, [errorNetwork, data])

  useEffect(() => {
    if(errorNetwork) alert(`error network ${errorNetwork.toString()}`)
    if (errorNetwork) setError({ hasError: true, message: errorNetwork.toString() })
    if (data?.status === 400) setError({ hasError: true, message: data.message })
    if (data?.status === 200 && data.accessToken) signIn({ token: data.accessToken, account: accounts, isActive: data.isActiveBucket })
  }, [errorNetwork, data])

  const onSubmit = () => {
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.requestAccounts()
      .then(accounts => {
        if(accounts[0] !== null) {
          setAccounts(accounts[0])
          alert(`wallet || ${accounts} - ${accounts[0]}`)
          execute({ wallet: accounts[0] })
        }
      })
      .catch((error) => {
        alert(`error ${error.toString()}`)
        setError({ hasError: true, message: error.toString() })
      })
  }

  const onSubmitSystemId = () => {
    if (!systemId) return setError({ hasError: true, message: 'Enter the system id.' })
    load({ id: systemId })
  }
  if (data?.status === 400) return <Redirect to='/sign-up' />
  if (isLoggedIn) return <Redirect to='/'/>

  return (
    <>
      <SeoLayout title='Wineth - Sign In' />
      <div className='l-form'>
        <form className='form'>
          <div className='form-img'>
            <img src={logo} alt='Logo Wineth'/>
          </div>
          <input
            className='input bottom'
            placeholder='System ID'
            onChange={value => setSystemId(value.target.value)}
          />
          {error.hasError && <Error className='bottom' message={error.message}/>}
          {isFetching || isLoading ? ( <Loader/> ) : (
            <>
              {isMobile ? (
                <Button variant message='Login con Metamask/TrustWallet' onClick={onSubmit} />
              ) : <Button variant message='Login con Metamask' onClick={onSubmit} /> }
              <Button onClick={onSubmitSystemId} message='Ingresar' />
            </>
          )}
        </form>
        {!isMobile && (
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
        )}
      </div>
    </>
  )
}

export default SignInPage
