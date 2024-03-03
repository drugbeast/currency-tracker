import { useEffect, useState } from 'react'

function useScroll() {
  const [scrollValue, setScrollValue] = useState(0)

  const handleScroll = (e) => {
    setScrollValue(e.currentTarget.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { value: scrollValue }
}

export default useScroll
