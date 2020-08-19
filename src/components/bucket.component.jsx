import React from 'react'
import { FaEthereum } from 'react-icons/fa'

// Import components
import Button from './button.component'
import Loader from './loader.component'

const Bucket = (props) => {
  const { name, price, id, onClick, isLoading, bucketId } = props
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
        {isLoading && id === bucketId ? (
          <div className='bucket-loader'>
            <Loader />
          </div>
        ) : (
          <Button message='Activar' onClick={onClick} />
        )}
      </div>
    </div>
  )
}

export default Bucket
