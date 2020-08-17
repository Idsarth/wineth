import React, {useEffect} from 'react'
import logo from '../static/img/logo.png'

// Import components
import Button from './button.component'
import Loader from './loader.component'

const ProgressPayment = (props) => {
  const { isFetching, data } = props
  useEffect(() => {
    console.log(data)
  }, [data])

  if(isFetching) return <Loader />
  return (
    <div className='progress'>
      {/*<img className='progress-img' src={logo} alt="wineth"/>*/}
      <div className='content-indicator'>
        <div className='progress-indicator-active'>
        1
        </div>
        <span />
        <div className='progress-indicator'>
          2
        </div>
        <span />
        <div className='progress-indicator'>
          3
        </div>
      </div>
      <Button
        message='Siguiente'
        onClick={console.log}
      />
    </div>
  )
}

export default ProgressPayment
