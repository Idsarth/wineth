import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { FaEthereum } from 'react-icons/fa'

import logo from '../static/img/logo.png'


// Import components
import Button from './button.component'
import Loader from './loader.component'
import Error from './error.component'
import Process from './process.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import { useFetch } from '../hooks/useAxios'

// Import utils
import { convert } from '../utils'

const web3 = new Web3(Web3.givenProvider)
const ProgressPayment = (props) => {
  const { user, reload } = useAuth()
  const { isFetching, data, bucketId, onClose } = props
  const [isReady, setIsReady] = useState(false)
  const [{ isFetching: isLoading, data: response }, execute] = useFetch({ url: '/transaction/validate', method: 'POST' }, false)
  const [transaction, setTransaction] = useState({
    step: 1,
    error: { hasError: false, message: '' },
    info: {
      amount: data?.AscendingLine?.nivel1?.amount,
      wallet: data?.AscendingLine?.nivel1?.address,
      userId: data?.AscendingLine?.nivel1?.user,
      wei: data?.AscendingLine?.nivel1?.wei,
      status: data?.AscendingLine?.nivel1?.statusLevel1
    },
    message: ''
  })

  useEffect(() => {
    if (transaction.step === 4 && !isLoading) reload({ token: user?.token, isActive: true, account: user.account })
  }, [transaction.step])

  useEffect(() => {
    console.log(response)
    if(response?.status === 400) setTransaction(prevState => ({ ...prevState, error: { hasError: true, message: response?.message } }))
    if(response?.status === 200 && response?.validate) {
      setTransaction(prevState => {
        return {
          ...prevState,
          step: prevState.step + 1,
          info: {
            amount: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.amount,
            wallet: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.address,
            userId: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.user,
            wei: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.wei,
            status: data?.AbortSignal?.[`nivel${prevState.step + 1}`]?.status
          }
        }
      })
    }
  }, [response])

  const handlePayment = () => {
    console.log('',{
      from: user.account,
      to: transaction.info.wallet,
      value: web3.utils.toWei(`${transaction.info.amount}`, 'ether')
    })
    setIsReady(true)
    web3.eth.sendTransaction({
      from: user.account,
      to: transaction.info.wallet,
      value: web3.utils.toWei(`${transaction.info.amount}`, 'ether')
    })
      .then(hash => {
        console.log(hash)
        execute({
          hash: hash.transactionHash,
          amount: transaction.info.amount,
          walletReceived: transaction.info.wallet,
          bucketId,
          receiveId: transaction.info.userId
        })
        console.log('send transaction to api => ',{
          hash: hash.transactionHash,
          amount: transaction.info.amount,
          walletReceived: transaction.info.wallet,
          bucketId,
          receiveId: transaction.info.userId
        })
        setTransaction(prevState => {
          return {
            ...prevState,
            message: 'Verificando transaccion...'
          }
        })
      })
      .catch((error) => setTransaction(prevState => {
        console.log(error)
        return {
          ...prevState,
          error: {
            hasError: true,
            message: 'Error when proceeding with payment'
          }
        }
      }))
      .finally(() => setIsReady(false))
    // setTimeout(() => {
    //   const hash = '0x7950e2b2d6ce7eb314f5e0a0ce4cfd1489503117'
    //   const params = {
    //     from: user.account,
    //     to: transaction.info.wallet,
    //     value: `${transaction.info.wei}`,
    //   }
    //   const transactionInfo = {
    //     hash,
    //     amount: data?.AscendingLine?.[`nivel${transaction.step}`]?.amount,
    //     walletReceived: data?.AscendingLine?.[`nivel${transaction.step}`]?.address,
    //     bucketId,
    //     receivedId: data?.AscendingLine?.[`nivel${transaction.step}`]?.user
    //   }
    //   console.log('transaction => ', transactionInfo)
    //   setTransaction(prevState => {
    //     return {
    //       ...prevState,
    //       step: prevState.step + 1,
    //       info: {
    //         amount: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.amount,
    //         wallet: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.address,
    //         userId: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.user,
    //         wei: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.wei,
    //         status: data?.AbortSignal?.[`nivel${prevState.step + 1}`]?.statusLevel1,
    //       }
    //     }
    //   })
    // }, 3000)


    // console.log({
    //   from: user.account,
    //   to: transaction.info.wallet,
    //   value: convert(transaction.info.amount)
    // })
    // window.ethereum
    //   .request({
    //     method: 'eth_sendTransaction',
    //     params: [{
    //       from: user.account,
    //       to: transaction.info.wallet,
    //       value: convert(transaction.info.amount),
    //     }]
    //   })
    //   .then(hash => {
    //     execute({
    //       hash,
    //       amount: transaction.info.amount,
    //       walletReceived: transaction.info.wallet,
    //       bucketId,
    //       receiveId: transaction.info.userId
    //     })
    //     setTransaction(prevState => {
    //       return {
    //         ...prevState,
    //         message: 'Verificando transaccion...'
    //       }
    //     })
    //   })
    //   .catch((error) => setTransaction(prevState => {
    //     return {
    //       ...prevState,
    //       error: {
    //         hasError: true,
    //         message: 'Error when proceeding with payment'
    //       }
    //     }
    //   }))
  }

  if(isFetching || isLoading || isReady) return (
    <div className='progress'>
      <Loader />
      <p className='progress-message'>{transaction.message}</p>
    </div>
  )
  if (transaction.step === 4 && !isLoading) return onClose(prevState => !prevState)
  return (
    <div style={{ height: transaction.error.hasError ? 400 : 300 }} className='progress'>
      <img className='progress-img' src={logo} alt="wineth"/>
      {/*<p style={{ fontSize: 40, color: 'red' }}>{transaction.step}</p>*/}
      <Process step={transaction.step} />
      <section className='progress-section'>
        <div className='progress-details'>
          <span>Monto: </span>
          <div>
            <FaEthereum className='progress-icon' />
            <span>{transaction?.info?.amount}</span>
          </div>
        </div>
        <input
          disabled
          type='text'
          className='input progress-input'
          defaultValue={transaction?.info?.wallet}
        />
        {transaction.error.hasError && <Error message={transaction.error.message} />}
        <Button message='Siguiente' onClick={handlePayment} />
      </section>
    </div>
  )
}

export default ProgressPayment
