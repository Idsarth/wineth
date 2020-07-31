import React, { useState, useEffect, createContext, useCallback } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (loading) return <p>loading....</p>

  const signIn = useCallback((user) => {
    setUser(user)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, signIn, signOut, isLoggedIn: !!user }} children={children} />
}

export { AuthContext, AuthProvider }
