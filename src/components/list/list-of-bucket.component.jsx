import React, {useEffect, useState} from 'react'

// Import components
import Bucket from '../bucket.component'
import Loader from '../loader.component'

// Import hooks
import { useFetch } from '../../hooks/useAxios'

const ListOfBucket = (props) => {
  const { refetch } = props
  const [{ isFetching, data, error }, reload] = useFetch({ url: `/bucket/getAll/${props.id}`, method: 'GET' })
  const [{ isFetching: isLoading, data: response, }, execute] = useFetch({ url: '/matrix/join_red', method: 'POST' }, false)
  const [bucketId, setBucketId] = useState()

  useEffect(() => {
    if (response?.status) props.onModal(true, bucketId)
  }, [response])

  useEffect(() => {
    if (refetch) reload()
  }, [refetch])

  const handleShowModal = async (id) => {
    setBucketId(id)
    execute()
  }
  if (isFetching) return (
    <div className='loader-bucket'>
      <Loader />
    </div>
  )
  if(error) return null
  return (
    <>
      {data?.map(bucket => {
        return (
          <Bucket
            active={bucket.status}
            expire={bucket.expire}
            onClick={() => handleShowModal(bucket.id)}
            key={bucket.id}
            id={bucket.id}
            bucketId={bucketId}
            name={bucket.name}
            price={bucket.price}
            isLoading={isLoading}
            isEnabled={bucket.isEnabled}
          />
        )
      })}
    </>
  )
}

export default ListOfBucket
