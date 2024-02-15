import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import { paths } from '../../constants/routes'
import useTheme from '../../utils/useTheme'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import styles from './Header.module.scss'

function Header() {
  const navs = [
    {
      path: paths.default,
      title: 'Home',
    },
    {
      path: paths.timeline,
      title: 'Timeline',
    },
    {
      path: paths.bankCard,
      title: 'Bank card',
    },
    {
      path: paths.contato,
      title: 'Contato',
    },
  ]

  const { theme, setTheme } = useTheme()
  const [screenWidth, setScreenWidth] = useState(window.screen.availWidth)

  const handleResize = e => {
    setScreenWidth(e.currentTarget.screen.availWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {screenWidth > 769 && (
        <header className={styles.header}>
          <div className="container">
            <div className={styles.inner}>
              <NavLink to={paths.default}>
                <Logo width={40} height={41} />
              </NavLink>
              <nav className={styles.nav}>
                {navs.map(item => (
                  <NavLink
                    key={uuidv4()}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? [styles.default, styles.active].join(' ')
                        : styles.default
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
              <input
                type="checkbox"
                id="toggle-button"
                className={styles.switcher}
                checked={theme === 'light'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
              <label htmlFor="toggle-button" className={styles.circle} />{' '}
            </div>
          </div>
        </header>
      )}
      {screenWidth < 769 && <BurgerMenu navs={navs} />}
    </>
  )
}

export default Header
