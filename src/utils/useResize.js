import { useEffect, useState } from 'react'

function useResize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width: screenWidth }
}

export default useResize
