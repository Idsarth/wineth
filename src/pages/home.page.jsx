import React from 'react'

// Import context
// import { useAuth } from '../hooks/useAuth'

// Import components
import ListOfStatistics from '../components/list/list-of-statistics'

const HomePage = () => {
  // const { user } = useAuth()

  return (
    <div>
      <div className="home-statistics">
        <ListOfStatistics />
      </div>
    </div>
  )
}

export default HomePage
