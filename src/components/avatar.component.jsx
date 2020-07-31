import React from 'react'

// Import hooks
import { useAuth } from '../hooks/useAuth'

const Avatar = () => {
  const { user } = useAuth()

  return (
    <div>
      <p>{user.email}</p>
      
    </div>
  )
}

export default Avatar
