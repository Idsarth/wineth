import React from 'react'

// Import context
// import { useAuth } from '../hooks/useAuth'

// Import components
import ListOfStatistics from '../components/list/list-of-statistics'
import ListOfBucket from '../components/list/list-of-bucket.component'

import Particle from '../components/particle.component'

const HomePage = () => {
  // const { user } = useAuth()

  return (
    <div>
      <div className="home-statistics">
        <ListOfStatistics />
      </div>
      <main className='l-main'>
        <ListOfBucket />
      </main>

      <Particle
        params={{
          "particles": {
            "number": {
              "value": 160,
              "density": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "speed": 4,
                "size_min": 0.3
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "random": true,
              "speed": 1,
              "direction": "top",
              "out_mode": "out"
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble"
              },
              "onclick": {
                "enable": true,
                "mode": "repulse"
              }
            },
            "modes": {
              "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
              },
              "repulse": {
                "distance": 400,
                "duration": 4
              }
            }
          }
        }}
      />
    </div>
  )
}

export default HomePage
