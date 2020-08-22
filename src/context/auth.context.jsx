import React, { useState, useEffect, createContext, useCallback } from 'react'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storage = localStorage.getItem('@storage')
    try {
      if (storage) setUser(null)
      setUser(JSON.parse(storage))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const reload = useCallback((data) => {
    localStorage.removeItem('@storage')
    localStorage.setItem('@storage', JSON.stringify(data))
    setUser(data)
  }, [])

  const signIn = useCallback((user) => {
    localStorage.setItem('@storage', JSON.stringify(user))
    setUser(user)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@storage')
    setUser(null)
  }, [])

  if (loading) return <p>loading....</p>
  return <AuthContext.Provider value={{ user, signIn, signOut, isLoggedIn: !!user, reload }} children={children} />
}

export { AuthContext, AuthProvider }
