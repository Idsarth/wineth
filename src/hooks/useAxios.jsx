import { useCallback, useEffect, useState } from 'react'
import { useStorage } from './useStorage'

export const useFetch = ({ url, body, method }, immediate = true) => {
  const { storage } = useStorage('@storage::token', '')
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState({ hasError: false, message: '' })
  const [data, setData] = useState()
  const [reFetch, setRefetch] = useState(false)

  useEffect(() => {
    if (immediate || reFetch) execute()
  }, [execute, immediate, reFetch])

  const execute = useCallback(async () => {
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'Application/json')
      headers.append('Authorization', `${storage}`)

      const response = await fetch(url, { method, body: JSON.stringify(body), headers })
      const result = await response.json()
      setData(result)
    } catch (error) {
      setError({ hasError: true, message: error.toString() })
    } finally {
      setIsFetching(false)
    }
  }, [])

  return [{ isFetching, error, data }, execute, setRefetch]
}
