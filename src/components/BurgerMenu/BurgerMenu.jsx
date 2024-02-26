import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import { paths } from '../../constants/routes'
import useScroll from '../../utils/useScroll'
import { ThemeContext } from '../Theme'
import styles from './BurgerMenu.module.scss'

function BurgerMenu(props) {
  const { theme, setTheme } = useContext(ThemeContext)
  const [isCross, setCross] = useState(false)
  const scrollY = useScroll()
  const { navs } = props

  return (
    <>
      <header
        className={
          scrollY.value > 80
            ? [styles.header, styles.sticky].join(' ')
            : styles.header
        }
      >
        <div className="container">
          <div className={styles.inner}>
            <NavLink to={paths.default} className={styles.logo}>
              <Logo width={40} height={41} />
            </NavLink>
            <div className={styles.burger} onClick={() => setCross(!isCross)}>
              <span
                className={
                  isCross
                    ? [styles.part, styles.toLeft].join(' ')
                    : [styles.part, styles.up].join(' ')
                }
              />
              <span
                className={
                  isCross
                    ? [styles.part, styles.centerDisabled].join(' ')
                    : [styles.part, styles.centerEnabled].join(' ')
                }
              />
              <span
                className={
                  isCross
                    ? [styles.part, styles.toRight].join(' ')
                    : [styles.part, styles.down].join(' ')
                }
              />
            </div>
          </div>
        </div>
      </header>

      {isCross && (
        <section className={styles.wrapper}>
          <div className={styles.menu}>
            <div className={styles.burgerInner}>
              <nav className={styles.nav}>
                {navs.map((item) => (
                  <NavLink
                    onClick={() => setCross(!isCross)}
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
              <label htmlFor="toggle-button" className={styles.circle} />{' '}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default BurgerMenu
