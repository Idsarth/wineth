import React, {useEffect, useState} from 'react'

// Import components
import Bucket from '../bucket.component'

// Import hooks
import { useFetch } from '../../hooks/useAxios'

const ListOfBucket = (props) => {
  const [{ isFetching, data }] = useFetch({ url: '/bucket/getAll', method: 'GET' })
  const [{ isFetching: isLoading, data: response, }, execute] = useFetch({ url: '/matrix/join_red', method: 'POST' }, false)
  const [bucketId, setBucketId] = useState()

  useEffect(() => {
    if (response?.status) props.onModal(true, bucketId)
  }, [response])

  const handleShowModal = async (id) => {
    setBucketId(id)
    execute()
  }
  if (isFetching) return <p>loading...</p>
  return (
    <>
      {data.buckets.map(bucket => (
        <Bucket
          onClick={() => handleShowModal(bucket.id)}
          key={bucket.id}
          id={bucket.id}
          bucketId={bucketId}
          name={bucket.name}
          price={bucket.price}
          isLoading={isLoading}
        />
      ))}
    </>
  )
}

export default ListOfBucket
