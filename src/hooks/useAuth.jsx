import { useContext } from 'react'

// Import context
import { AuthContext } from '../context/auth.context'

export const useAuth = () => useContext(AuthContext)
