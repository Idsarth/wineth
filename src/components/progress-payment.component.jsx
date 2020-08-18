import React, {useEffect, useState} from 'react'
import { FaEthereum } from 'react-icons/fa'

import logo from '../static/img/logo.png'


// Import components
import Button from './button.component'
import Loader from './loader.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

// Import utils
import { convert } from '../utils'

const ProgressPayment = (props) => {
  const { user } = useAuth()
  const { isFetching, data } = props
  const [step, setStep] = useState(1)
  const [paymentInfo, setPaymentInfo] = useState({
    amount: data?.AscendingLine?.nivel1?.amount,
    wallet: data?.AscendingLine?.nivel1?.address,
    value: ''
  })

  useEffect(() => {
    if (data) {
      setPaymentInfo({
        amount: data?.AscendingLine?.nivel1?.amount,
        wallet: data?.AscendingLine?.nivel1?.address,
        value: ''
      })
    }
  }, [data])

  const handlePayment = () => {
    console.log(convert('0.231'))
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: user.account,
            to: '0xDccA922Ca15Fce55521641BF73f394E1D628757a',
            value: '0x9184e72a',
          },
        ]
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if(isFetching) return (
    <div className='progress'>
      <Loader />
    </div>
  )
  return (
    <div className='progress'>
      <img className='progress-img' src={logo} alt="wineth"/>
      <div className='content-indicator'>
        <div className='progress-indicator-active'> 1 </div>
        <span />
        <div className='progress-indicator'> 2 </div>
        <span />
        <div className='progress-indicator'> 3 </div>
      </div>
      <section className='progress-section'>
        <div className='progress-details'>
          <span>Monto: </span>
          <div>
            <FaEthereum className='progress-icon' />
            <span>{paymentInfo.amount}</span>
          </div>
        </div>
        <input
          disabled
          type='text'
          className='input progress-input'
          defaultValue={paymentInfo.wallet}
        />
        <Button
          message='Siguiente'
          onClick={handlePayment}
        />
      </section>
    </div>
  )
}

export default ProgressPayment
