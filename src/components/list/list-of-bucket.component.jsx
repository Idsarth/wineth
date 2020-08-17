import React from 'react'

// Import components
import Bucket from '../bucket.component'

// Import hooks
import { useFetch } from '../../hooks/useAxios'

const ListOfBucket = () => {
  const [{ isFetching, error, data }] = useFetch({ url: '/bucket/getAll', method: 'GET' })

  if (isFetching) return <p>loading...</p>

  return (
    <>
      {data.buckets.map(bucket => (
        <Bucket
          key={bucket.id}
          id={bucket.id}
          name={bucket.name}
          price={bucket.price}
        />
      ))}
    </>
  )
}

export default ListOfBucket
