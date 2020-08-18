import { useCallback, useEffect, useState } from 'react'

// Import utils
import { Env } from '../utils'

// import hooks
import { useAuth } from './useAuth'

export const useFetch = ({ url, body, method }, immediate = true) => {
  const { user } = useAuth()
  const [isFetching, setIsFetching] = useState(immediate)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  const [reFetch, setRefetch] = useState(false)

  const execute = useCallback(async (data) => {
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('auth-token', `${user?.token}`)
      setIsFetching(true)
      const response = await fetch(`${Env.SERVER_ADDRESS}${url}`,
        {
          headers,
          method,
          body: data ? JSON.stringify(data) : JSON.stringify(body)
        })
      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.toString())
    } finally {
      setIsFetching(false)
    }
  }, [url, body, method])

  useEffect(() => {
    if (immediate || reFetch) execute()
  }, [execute, immediate, reFetch])


  return [{ isFetching, error, data }, execute, setRefetch]
}
