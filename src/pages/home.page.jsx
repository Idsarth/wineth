import React from 'react'

// Import context
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const { user } = useAuth()

  return (
    <div>
      <p>HomePage</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default HomePage
