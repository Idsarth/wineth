import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Ethereum from '@metamask/detect-provider'

// Import logo
import logo from '../static/img/logo.png'

// Import components
import Particle from '../components/particle.component'
import Error from '../components/error.component'
import Button from '../components/button.component'
import Loader from '../components/loader.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import {useFetch} from "../hooks/useAxios";

const SignUpPage = () => {
  const { signIn, isLoggedIn } = useAuth()
  const { id } = useParams()
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
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload())
    }
    detectProvider()
  }, [])

  useEffect(() => {
    if (errorNetwork) setError({ hasError: true, message: errorNetwork.toString() })
    if (data.status === 400) setError({ hasError: true, message: data.message })
    if (data.status === 200 && data.accessToken) signIn({ token: data.accessToken, account: accounts })
  }, [errorNetwork, data])

  const onSubmit = () => {
    window.ethereum
      .request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        if (accounts.length === 0) setError({hasError: true, message: 'Please connect to Metamask.'})
        if (accounts[0] !== null) {
          setAccounts(accounts[0])
          execute({ wallet: accounts[0], sponsorId: id ? id : 1 })
        }
      })
  }

  if (isLoggedIn) return <Redirect to='/' />
  return (
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
        <span className='form-message'>Inicia sesion con metamask para continuar.</span>
        {isFetching ? (
          <Loader />
        ) : (
          <Button
            variant
            message='Login con Metamask'
            onClick={onSubmit}
          />
        )}
      </form>
      <Particle />
    </div>
  )
}

export default SignUpPage
