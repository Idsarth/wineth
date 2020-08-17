import React from 'react'
import Particles from 'react-particles-js'

const Particle = () => {
  return (
    <div className='particle'>
      <Particles
        className='particles'
        params={{
          "particles": {
            "number": {
              "value": 50
            },
            "size": {
              "value": 3
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            }
          }
        }}
      />
    </div>
  )
}

export default Particle
