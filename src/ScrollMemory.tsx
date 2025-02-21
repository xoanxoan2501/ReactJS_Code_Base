import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollMemory = () => {
  const location = useLocation()

  useEffect(() => {
    // Cách 1: Sử dụng 'instant' để cuộn ngay lập tức
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return null
}

export default ScrollMemory
