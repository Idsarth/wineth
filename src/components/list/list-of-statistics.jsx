import React, {} from 'react'
import { FaEthereum, FaLevelUpAlt } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
import { MdAccountBalance } from 'react-icons/md'

// Import components
import Card from '../card.component'
import CardShimmer from '../shimmer/card.shimmer'

// Import hooks
import { useFetch } from '../../hooks/useAxios'

const ListOfStatistics = () => {
  const [{ isFetching, data }] = useFetch({ url: '/user/profits', method: 'POST' })

  if(isFetching) return <CardShimmer />
  return (
    <>
      <Card
        logo={<FaEthereum className='home-icon' />}
        title='Ganancias Ethereum'
        total={data?.profits ? data.profits : 0}
      />
      <Card
        logo={<AiFillDollarCircle className='home-icon' />}
        title='Ganancias en Dolares'
        total={`$${data?.usdProfits ? data.usdProfits : '0.00'}`}
      />
      <Card
        logo={<MdAccountBalance className='home-icon' />}
        title='Total Partners'
        total={data?.partners ? data.partners : 0}
      />
      <Card
        logo={<FaLevelUpAlt className='home-icon' />}
        title='Nivel Actual'
        total={5}
      />
    </>
  )
}

export default ListOfStatistics
