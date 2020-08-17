import React from 'react'
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
        <p>{name}</p>
        <span>{price}</span>
        <Button
          message='Activar'
          onClick={console.log}
        />
      </div>
    </div>
  )
}

export default Bucket
