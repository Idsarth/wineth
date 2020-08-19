import React, {useEffect, useState, useMemo} from 'react'

// Import context
// import { useAuth } from '../hooks/useAuth'

// Import components
import ListOfStatistics from '../components/list/list-of-statistics'
import ListOfBucket from '../components/list/list-of-bucket.component'
import Modal from '../components/modal.component'
import ProgressPayment from '../components/progress-payment.component'

import Particle from '../components/particle.component'

// Import hooks
import { useFetch } from '../hooks/useAxios'

const HomePage = () => {
  const [show, setShow]  = useState(false)
  const [bucketId, setBucketId] = useState()
  const [{ data, isFetching }, execute] = useFetch({ method: 'GET', url: `/matrix/sponsors/${bucketId}` }, false)

  const handleShow = (show, id) => {
    setShow(show)
    setBucketId(id)
  }

  useEffect(() => {
    if (bucketId) execute()
  }, [bucketId])

  const ListBucket = useMemo(() => {
    return (
      <Modal
        onClosed={() => setShow(prevState => !prevState)}
        className={show ? 'active' : ''}>
        <ProgressPayment onClose={setShow} isFetching={isFetching} data={data} bucketId={bucketId} />
      </Modal>
    )
  }, [show, isFetching, data, bucketId])

  return (
    <div>
      <div className="home-statistics">
        <ListOfStatistics />
      </div>
      <main className='l-main'>
        <ListOfBucket onModal={handleShow} />
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
      {data?.AscendingLine && ListBucket}
    </div>
  )
}

export default HomePage
