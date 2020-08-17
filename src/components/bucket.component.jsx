import React from 'react'
import { FaEthereum } from 'react-icons/fa'

// Import components
import Button from './button.component'

const Bucket = (props) => {
  const { name, price, id } = props
  return (
    <div className='bucket'>
      <div className='bucket-img'>
        <img src={require(`../static/img/bucket_${id}.png`)}/>
      </div>

      <div className='bucket-footer'>
        <div className='bucket-details'>
          <p>{name}</p>
          <span>
            <FaEthereum className='bucket-icon' />
            <span className='bucket-price'>{price}</span>
          </span>
        </div>
        <Button
          message='Activar'
          onClick={console.log}
        />
      </div>
    </div>
  )
}

export default Bucket
