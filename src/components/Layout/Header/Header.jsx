/* eslint-disable jsx-a11y/label-has-associated-control */
import Logo from 'Assets/images/logo.svg'
import { PATHS, SCROLL_VALUE, THEMES } from 'Constants/constants'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useScroll from 'Utils/hooks/useScroll'

import { ThemeContext } from '../../Theme'
import { NAVS } from './Header.config'
import styles from './Header.module.scss'

function Header() {
  const { theme, setTheme } = useContext(ThemeContext)
  const scrollY = useScroll()
  const [isCross, setCross] = useState(false)

  const handleChangeTheme = () => {
    setTheme(theme === THEMES.dark ? THEMES.light : THEMES.dark)
  }

  return (
    <header
      className={
        scrollY.value > SCROLL_VALUE
          ? `${styles.header} ${styles.sticky}`
          : styles.header
      }
    >
      <div className="container">
        <div className={styles.inner}>
          <NavLink to={PATHS.default}>
            <Logo width={40} height={41} />
          </NavLink>
          <div className={isCross ? styles.wrapper : styles.wrapperDisabled}>
            <div className={styles.wrapperInner}>
              <nav className={styles.nav}>
                {NAVS.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setCross(!isCross)}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.disabled} ${styles.active}`
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
                checked={theme === THEMES.light}
                onChange={handleChangeTheme}
              />
              <label htmlFor="toggle-button" className={styles.circle} />
            </div>
          </div>
          <div
            className={styles.burger}
            onClick={() => setCross(!isCross)}
            data-cy="burger"
          >
            <span
              className={
                isCross
                  ? `${styles.part} ${styles.toLeft}`
                  : `${styles.part} ${styles.up}`
              }
            />
            <span
              className={
                isCross
                  ? `${styles.part} ${styles.centerDisabled}`
                  : `${styles.part} ${styles.centerEnabled}`
              }
            />
            <span
              className={
                isCross
                  ? `${styles.part} ${styles.toRight}`
                  : `${styles.part} ${styles.down}`
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
