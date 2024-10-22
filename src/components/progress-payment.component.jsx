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

const web3 = new Web3(Web3.givenProvider)
const ProgressPayment = (props) => {
  const { user, reload } = useAuth()
  const { isFetching, data, bucketId, onClose, refetch } = props
  const [isReady, setIsReady] = useState(false)
  const [close, setClose] = useState(1)
  const [{ isFetching: isLoading, data: response }, execute] = useFetch({ url: '/transaction/validate', method: 'POST' }, false)
  const [transaction, setTransaction] = useState(() => {
    let values = {}
    let count = 0
    for (let key in data?.AscendingLine) {
      count++
      if(data?.AscendingLine[key].status === 'pending') {
        values = {
          amount: data?.AscendingLine[key].amount,
          wallet: data?.AscendingLine[key].address,
          userId: data?.AscendingLine[key].user,
          wei: data?.AscendingLine[key].wei,
          status: data?.AscendingLine[key].status,
        }
        break
      }
    }
    const check = values?.amount ? true : false
    return {
      step: count !== 0 ? count : 1,
      error: { hasError: false, message: '' },
      info: {
        amount: check ? values.amount : data?.AscendingLine?.nivel1?.amount,
        wallet: check ? values.wallet : data?.AscendingLine?.nivel1?.address,
        userId: check ? values.userId : data?.AscendingLine?.nivel1?.user,
        wei: check <= 0 ? values.wei : data?.AscendingLine?.nivel1?.wei,
        status: check <= 0 ? values.status : data?.AscendingLine?.nivel1?.status
      },
      message: ''
    }
  })

  useEffect(() => {
    if (close === 3 && !isLoading) {
      reload({ token: user?.token, isActive: true, account: user.account })
      refetch(true)
      onClose(prevState => !prevState)
      setClose(1)
    }
  }, [close])

  useEffect(() => {
    if(response?.status === 400) setTransaction(prevState => ({ ...prevState, error: { hasError: true, message: response?.message } }))
    if(response?.status === 200 && response?.validate) {
      setTransaction(prevState => {
        if (prevState.step >= 3) {
          setClose(3)
          reload({ token: user?.token, isActive: true, account: user.account })
          window.location.reload()
          return {
            step: 1,
            error: { hasError: false, message: '' },
            info: {
              amount: data?.AscendingLine?.nivel1?.amount,
              wallet: data?.AscendingLine?.nivel1?.address,
              userId: data?.AscendingLine?.nivel1?.user,
              wei: data?.AscendingLine?.nivel1?.wei,
              status: data?.AscendingLine?.nivel1?.status
            },
            message: ''
          }
        }
        return {
          ...prevState,
          step: prevState.step + 1,
          info: {
            amount: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.amount,
            wallet: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.address,
            userId: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.user,
            wei: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.wei,
            status: data?.AscendingLine?.[`nivel${prevState.step + 1}`]?.status
          }
        }
      })

    }
  }, [response])

  const handlePayment = () => {
    setIsReady(true)
    setTransaction(prevState => {
      return {
        ...prevState,
        message: 'Por favor espere, esperando confirmacion.'
      }
    })
    web3.eth.sendTransaction({
      from: user.account,
      to: transaction.info.wallet,
      value: web3.utils.toWei(`${transaction.info.amount}`, 'ether')
    })
      .then(hash => {
        execute({
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
        return {
          ...prevState,
          error: {
            hasError: true,
            message: 'Error when proceeding with payment'
          }
        }
      }))
      .finally(() => setIsReady(false))
  }

  if(isFetching || isLoading || isReady) return (
    <div className='progress'>
      <Loader />
      <p className='progress-message'>{transaction.message}</p>
    </div>
  )
  return (
    <div style={{ height: transaction.error.hasError ? 400 : 300 }} className='progress'>
      <img className='progress-img' src={logo} alt="wineth"/>
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
