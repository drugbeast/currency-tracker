import { useEffect, useState } from 'react'

function useResize() {
  const [screenWidth, setScreenWidth] = useState(window.screen.availWidth)

  const handleResize = e => {
    setScreenWidth(e.currentTarget.screen.availWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width: screenWidth }
}

export default useResize
