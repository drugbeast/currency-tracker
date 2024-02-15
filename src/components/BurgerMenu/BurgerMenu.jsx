import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import { paths } from '../../constants/routes'
import useTheme from '../../utils/useTheme'
import styles from './BurgerMenu.module.scss'

function BurgerMenu(props) {
  const { theme, setTheme } = useTheme()
  const [isCross, setIsCross] = useState(false)
  const { navs } = props
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.inner}>
            <NavLink to={paths.default} className={styles.logo}>
              <Logo width={40} height={41} />
            </NavLink>
            <div className={styles.burger} onClick={() => setIsCross(!isCross)}>
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
            <div className={styles.inner}>
              <nav className={styles.nav}>
                {navs.map(item => (
                  <NavLink
                    onClick={() => setIsCross(!isCross)}
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
        </section>
      )}
    </>
  )
}

export default BurgerMenu
