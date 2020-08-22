import React, {useEffect} from 'react'
import { FaEthereum, FaLevelUpAlt } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
import { MdAccountBalance } from 'react-icons/md'

// Import components
import Card from '../card.component'
import CardShimmer from '../shimmer/card.shimmer'

// Import hooks
import { useFetch } from '../../hooks/useAxios'
import { useAuth } from '../../hooks/useAuth'

const ListOfStatistics = (props) => {
  const { user } = useAuth()
  const { refetch } = props
  const [{ isFetching, data, error }, execute] = useFetch({ url: '/user/profits', method: 'GET' }, false)
  const [{ isFetching: isLoading, data: response }, load] = useFetch({ url: `/user/profits/${user?.id}`, method: 'GET' }, false)

  useEffect(() => {
    if (user?.id) load()
    else execute()
  }, [])

  useEffect(() => {
    if (refetch) execute()
  }, [refetch])

  if(isFetching || isLoading) return <CardShimmer />
  if(error) return null
  return (
    <>
      <Card
        logo={<FaEthereum className='home-icon' />}
        title='Ganancias Ethereum'
        total={response?.profits ? response.profits ? response.profits : 0 : data?.profits ? data.profits : 0}
      />
      <Card
        logo={<AiFillDollarCircle className='home-icon' />}
        title='Ganancias en Dolares'
        total={`$${response?.usdProfits ? response.usdProfits ? response.usdProfits : '0.00' : data?.usdProfits ? data.usdProfits : '0.00'}`}
      />
      <Card
        logo={<MdAccountBalance className='home-icon' />}
        title='Total Partners'
        total={response?.partners ? response.partners ? response.partners : 0 : data?.partners ? data.partners : 0}
      />
      <Card
        logo={<FaLevelUpAlt className='home-icon' />}
        title='Ultimo Bucket'
        total={response?.lastBucket ? response.lastBucket ? response.lastBucket : 0 : data?.lastBucket ? data.lastBucket : 0}
      />
    </>
  )
}

export default ListOfStatistics
