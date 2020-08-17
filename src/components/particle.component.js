import React from 'react'
import Particles from 'react-particles-js'

const Particle = (props) => {
  const { params } = props

  return (
    <div className='particle'>
      <Particles
        className='particles'
        params={params}
      />
    </div>
  )
}

export default Particle
