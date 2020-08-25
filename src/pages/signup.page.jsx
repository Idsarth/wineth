import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Ethereum from '@metamask/detect-provider'
import Web3 from 'web3'

// Import logo
import logo from '../static/img/logo.png'

//  Import layout
import SeoLayout from '../layout/seo.layout'

// Import components
import Particle from '../components/particle.component'
import Error from '../components/error.component'
import Button from '../components/button.component'
import Loader from '../components/loader.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import {useFetch} from "../hooks/useAxios";

const SignUpPage = () => {
  const { id } = useParams()
  const { signIn, isLoggedIn } = useAuth()
  const [accounts, setAccounts] = useState('')
  const [{ error: errorNetwork, isFetching, data }, execute] = useFetch({
    url: '/auth/signup',
    method: 'POST'
  }, false)
  const [error, setError] = useState({ hasError: false, message: '' })

  useEffect(() => {
    const detectProvider = async () => {
      const provider = await Ethereum()
      if (!provider) return setError({ hasError: true, message: 'Please install MetaMask!' })
    }
    detectProvider()
  }, [])

  useEffect(() => {
    if (errorNetwork) setError({ hasError: true, message: errorNetwork.toString() })
    if (data.status === 400) setError({ hasError: true, message: data.message })
    if (data.status === 200 && data.accessToken) signIn({ token: data.accessToken, account: accounts })
  }, [errorNetwork, data])

  const onSubmit = () => {
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.requestAccounts()
      .then(accounts => {
        if(accounts[0] !== null) {
          setAccounts(accounts[0])
          execute({ wallet: accounts[0], sponsorId: id ? id : 1 })
        }
      })
      .catch((error) => {
        setError({ hasError: true, message: error.toString() })
      })
  }

  if (isLoggedIn) return <Redirect to='/' />
  return (
    <>
      <SeoLayout title='Wineth - Sign up' />
      <div className='l-form'>
        <form className='form'>
          <div className='form-img'>
            <img src={logo} alt='Logo Wineth' />
          </div>
          <input
            className='input bottom'
            placeholder={`System ID: ${id ? id : '1'}`}
            onChange={console.log}
            disabled
          />
          {error.hasError && <Error className='bottom' message={error.message} />}
          <span className='form-message'>Registrate para continuar.</span>
          {isFetching ? ( <Loader /> ) : (
            <Button
              variant
              message='Registro con Metamask/TrustWallet'
              onClick={onSubmit}
            />
          )}
        </form>
        <Particle />
      </div>
    </>
  )
}

export default SignUpPage
