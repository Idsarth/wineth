import React, {useEffect, useState, useMemo} from 'react'
import { decode } from 'jsonwebtoken'

// Import components
import ListOfStatistics from '../components/list/list-of-statistics'
import ListOfBucket from '../components/list/list-of-bucket.component'
import Modal from '../components/modal.component'
import ProgressPayment from '../components/progress-payment.component'

import Particle from '../components/particle.component'

// Import hooks
import { useFetch } from '../hooks/useAxios'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const { user } = useAuth()
  const [show, setShow]  = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [bucketId, setBucketId] = useState()
  const [{ data, isFetching, error }, execute] = useFetch({ method: 'GET', url: `/matrix/sponsors/${bucketId}` }, false)

  const handleShow = (show, id) => {
    setShow(show)
    setBucketId(id)
  }

  useEffect(() => {
    if (bucketId) execute()
  }, [bucketId])

  const handleRefetch = (refetch) => setRefetch(refetch)
  const ListBucket = useMemo(() => {
    return (
      <Modal
        onClosed={() => setShow(prevState => !prevState)}
        className={show ? 'active' : ''}>
        <ProgressPayment refetch={handleRefetch} onClose={setShow} isFetching={isFetching} data={data} bucketId={bucketId} />
      </Modal>
    )
  }, [show, isFetching, data, bucketId])


  return (
    <div>
      <div className="home-statistics">
        <ListOfStatistics refetch={refetch} />
      </div>
      <main className='l-main'>
        <ListOfBucket refetch={refetch}  id={user?.token ? decode(user.token)?.id : user?.id} onModal={handleShow} />
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
      {/* {ListBucket} */}
    </div>
  )
}

export default HomePage
