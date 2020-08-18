import React, { useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa'

import logo from '../static/img/logo.png'


// Import components
import Button from './button.component'
import Loader from './loader.component'
import Error from './error.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'
import { useFetch } from '../hooks/useAxios'

// Import utils
// import { convert } from '../utils'

const ProgressPayment = (props) => {
  const { user } = useAuth()
  const { isFetching, data, bucketId } = props
  const [{ isFetching: isLoading, data: response }, execute] = useFetch({ url: '/transaction/validate', method: 'POST' }, false)
  const [transaction, setTransaction] = useState({
    step: 1,
    error: { hasError: false, message: '' },
    info: {
      amount: data?.AscendingLine?.nivel1?.amount,
      wallet: data?.AscendingLine?.nivel1?.address,
      userId: data?.AscendingLine?.nivel1?.user,
      wei: data?.AscendingLine?.nivel1?.wei
    }
  })

  useEffect(() => {
    if(response?.status === 400) setTransaction(prevState => ({ ...prevState, error: { hasError: true, message: response?.message } }))
    if(response?.status === 200 && response?.validate) {
      setTransaction(prevState => {
        return {
          ...prevState,
          step: prevState.step + 1,
          info: {
            amount: data?.AscendingLine?.[`nivel${prevState.step}`]?.amount,
            wallet: data?.AscendingLine?.[`nivel${prevState.step}`]?.address,
            userId: data?.AscendingLine?.[`nivel${prevState.step}`]?.user,
            wei: data?.AscendingLine?.[`nivel${prevState.step}`]?.wei
          }
        }
      })
    }
  }, [response])

  const handlePayment = () => {
    // console.log(convert(transaction.info.amount))
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [{
          from: user.account,
          to: transaction.info.wallet,
          value: `${transaction.info.wei}`,
        }]
      })
      .then(hash => execute({
        hash,
        amount: transaction.info.amount,
        walletReceived: transaction.info.wallet,
        bucketId,
        receiveId: transaction.info.userId
      }))
      .catch((error) => setTransaction(prevState => {
        return {
          ...prevState,
          error: {
            hasError: true,
            message: 'Error when proceeding with payment'
          }
        }
      }))
  }

  if(isFetching || isLoading) return (
    <div className='progress'>
      <Loader />
    </div>
  )
  return (
    <div style={{ height: transaction.error.hasError ? 400 : 300 }} className='progress'>
      <img className='progress-img' src={logo} alt="wineth"/>
      <div className='content-indicator'>
        <div className='progress-indicator-active'> 1 </div>
        <span style={{ backgroundColor: transaction.step === 2 ? '#0A51A1' : '#1b2e4b' }} />
        <div className={transaction.step === 2 ? 'progress-indicator-active' : 'progress-indicator'}> 2 </div>
        <span style={{ backgroundColor: transaction.step === 3 ? '#0A51A1' : '#1b2e4b' }} />
        <div className={transaction.step === 3 ? 'progress-indicator-active' : 'progress-indicator'}> 3 </div>
      </div>
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
        <Button
          message='Siguiente'
          onClick={handlePayment}
        />
      </section>
    </div>
  )
}

export default ProgressPayment
