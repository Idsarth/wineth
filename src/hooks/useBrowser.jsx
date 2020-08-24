import { useEffect, useState } from 'react'

export const useBrowser = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const browser = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(browser)
    if(isMobile) setIsMobile(true)
  }, [])

  return { isMobile }
}
