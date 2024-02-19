import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import { paths } from '../../constants/routes'
import useResize from '../../utils/useResize'
import useScroll from '../../utils/useScroll'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import { ThemeContext } from '../Theme'
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

  const { theme, setTheme } = useContext(ThemeContext)
  const screenWidth = useResize()
  const scrollY = useScroll()

  return (
    <>
      {screenWidth.width > 769 && (
        <header
          className={
            scrollY.value > 80
              ? [styles.header, styles.sticky].join(' ')
              : styles.header
          }
        >
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
                        ? [styles.disabled, styles.active].join(' ')
                        : styles.disabled
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
              <label htmlFor="toggle-button" className={styles.circle} />
            </div>
          </div>
        </header>
      )}
      {screenWidth.width <= 768 && <BurgerMenu navs={navs} />}
    </>
  )
}

export default Header
