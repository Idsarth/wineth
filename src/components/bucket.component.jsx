import React from 'react'
import { FaEthereum } from 'react-icons/fa'

// Import components
import Button from './button.component'
import Loader from './loader.component'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const Bucket = (props) => {
  const { user } = useAuth()
  const { name, price, id, onClick, isLoading, bucketId, active, expire, isEnabled } = props
  return (
    <div className='bucket'>
      <div className='bucket-img'>
        <img src={require(`../static/img/bucket_${id}.png`)} alt='bucket wineth'/>
      </div>

      <div className='bucket-footer'>
        <div className='bucket-details'>
          <p>{name}</p>
          <span>
            <FaEthereum className='bucket-icon' />
            <span className='bucket-price'>{price}</span>
          </span>
        </div>
        {user?.token ? (
          <>
            {active && (
              <div className={`bucket-expire ${expire <=5 ? 'bucket-warning' : ''}`}>
                <span>Expira en {expire} dias</span>
              </div>
            )}
            {isLoading && id === bucketId ? (
              <div className='bucket-loader'>
                <Loader />
              </div>
            ) : ( <Button disabled={active || !isEnabled} message='Activar' onClick={onClick} /> )}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Bucket
