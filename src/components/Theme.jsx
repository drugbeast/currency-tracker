import { THEMES } from 'Constants/constants'
import { createContext, useLayoutEffect, useState } from 'react'

export const ThemeContext = createContext(null)

const getTheme = () => {
  let theme = localStorage.getItem('theme')

  if (!theme) {
    localStorage.setItem('theme', THEMES.dark)
    theme = THEMES.dark
  }

  return theme
}

function Theme(props) {
  const { children } = props
  const [theme, setTheme] = useState(getTheme)

  useLayoutEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const contextValue = { theme, setTheme }

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  )
}

export default Theme
