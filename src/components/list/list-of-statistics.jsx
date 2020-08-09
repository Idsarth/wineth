import React from 'react'
import { FaEthereum, FaLevelUpAlt } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
import { MdAccountBalance } from 'react-icons/md'

// Import components
import Card from '../card.component'

const items = [
    {
        id: 1,
        logo: <FaEthereum className='home-icon' />,
        title: "Ganancias Ethereum",
        total: 52.00
    },
    {
        id: 2,
        logo: <AiFillDollarCircle className='home-icon' />,
        title: "Ganancias en Dolares",
        total: `USD$ 20481.22`
    },
    {
        id: 3,
        logo: <MdAccountBalance className='home-icon' />,
        title: "Total Partners",
        total: 40
    },
    {
        id: 4,
        logo: <FaLevelUpAlt className='home-icon' />,
        title: "Nivel Actual",
        total: 5
    },
]

const ListOfStatistics = () => {
    return (
       <>
           {items.map(item => (
               <Card
                   key={item.id}
                   logo={item.logo}
                   title={item.title}
                   total={item.total}
               />
           ))}
       </>
    )
}

export default ListOfStatistics
