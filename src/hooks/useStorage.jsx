import { useState } from 'react'

export const useStorage = (key, initialState) => {
  const [storage, setStorage] = useState(() => {
    try {
      const storageValue = localStorage.getItem(key)
      return storageValue ? JSON.parse(storageValue) : initialState
    } catch (error) {
      return initialState
    }
  })

  const setStorageValue = value => {
      try {
        setStorage(value)
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(error)
      }
  }

  return { storage, setStorageValue }
}
