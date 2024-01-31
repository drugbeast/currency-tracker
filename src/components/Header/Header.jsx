import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import classes from './Header.module.scss'
import { paths } from '../../constants/routes'
import { useTheme } from '../../utils/useTheme'

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
    <header className={classes.header}>
      <div className="container">
        <div className={classes.headerInner}>
          <NavLink to="/">
            <Logo width={40} height={41} />
          </NavLink>
          <nav className={classes.nav}>
            {navs.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? [classes.default, classes.active].join(' ')
                    : classes.default
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <input
            type="checkbox"
            id="toggle-button"
            className={classes.switcher}
            onChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
          ></input>
          <label htmlFor="toggle-button" className={classes.circle}></label>
        </div>
      </div>
    </header>
  )
}

export default Header
