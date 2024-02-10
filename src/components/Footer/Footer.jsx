import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import classes from './Footer.module.scss'

function Footer() {
  const links = [
    {
      title: 'General',
      first: 'Market',
      second: 'Service',
    },
    {
      title: 'Product',
      first: 'Sparks',
      second: 'Snaps',
    },
    {
      title: 'Community',
      first: 'Ideas',
      second: 'Streams',
    },
  ]

  return (
    <footer>
      <div className="container">
        <div className={classes.inner}>
          <section className={classes.left}>
            <div className={classes.logo}>
              <Logo width={40} height={45} />
              <span className={classes.logoText}>Modsen Currency Tracker</span>
            </div>
            <p className={classes.text}>
              Since then, the company has grown organically to. Starsup is the
              world&rsquo;s largest trading platform, with $12 billion worth of
              currency trading and 500,000 tickets sold daily to tens of
              thousands of traders worldwide.
            </p>
          </section>
          <section className={classes.right}>
            <div className={classes.right}>
              {links.map(item => (
                <div className={classes.column} key={uuidv4()}>
                  <span className={classes.title}>{item.title}</span>
                  <div className={classes.links}>
                    <span className={classes.link}>{item.first}</span>
                    <span className={classes.link}>{item.second}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className={classes.copyinfo}>
        Startsup &copy; 2023-2024, All Rights Reserved
      </section>
    </footer>
  )
}

export default Footer
