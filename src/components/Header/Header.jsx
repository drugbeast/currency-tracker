import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import styles from './Header.module.scss'
import { paths } from '../../constants/routes'
import { useTheme } from '../../utils/useTheme'
import { v4 as uuidv4 } from 'uuid'

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

  return (
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
            checked={theme == 'light'}
            onChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
          ></input>
          <label htmlFor="toggle-button" className={styles.circle}></label>
        </div>
      </div>
    </header>
  )
}

export default Header
