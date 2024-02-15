/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Logo from '../../assets/images/logo.svg'
import styles from './Footer.module.scss'

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

  const [screenWidth, setScreenWidth] = useState(window.screen.availWidth)

  const handleResize = e => {
    setScreenWidth(e.currentTarget.screen.availWidth)
  }

  const [isUp, setIsUp] = useState({
    general: false,
    product: false,
    community: false,
  })

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <footer>
      <div className="container">
        <div className={styles.inner}>
          <section className={styles.left}>
            <div className={styles.logo}>
              <Logo width={40} height={45} className={styles.logo} />
              <span className={styles.logoText}>Modsen Currency Tracker</span>
            </div>
            <p className={styles.text}>
              Since then, the company has grown organically to. Starsup is the
              world&rsquo;s largest trading platform, with $12 billion worth of
              currency trading and 500,000 tickets sold daily to tens of thousands
              of traders worldwide.
            </p>
          </section>
          <section className={styles.right}>
            <div className={styles.right}>
              {links.map(item => (
                <div className={styles.column} key={uuidv4()}>
                  {screenWidth < 641 && (
                    <div className={styles.titleBlock}>
                      <span className={styles.title}>{item.title}</span>
                      <div
                        className={
                          isUp[item.title.toLowerCase()]
                            ? [styles.arrow, styles.up].join(' ')
                            : styles.arrow
                        }
                        onClick={() =>
                          setIsUp(prevIsUp => {
                            const newPrevIsUp = { ...prevIsUp }
                            newPrevIsUp[item.title.toLowerCase()] =
                              !prevIsUp[item.title.toLowerCase()]
                            return newPrevIsUp
                          })
                        }
                      />
                    </div>
                  )}
                  {screenWidth > 641 && (
                    <span className={styles.title}>{item.title}</span>
                  )}
                  {(isUp[item.title.toLowerCase()] || screenWidth > 640) && (
                    <div className={styles.links}>
                      <span className={styles.link}>{item.first}</span>
                      <span className={styles.link}>{item.second}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className={styles.copyinfo}>
        Startsup &copy; 2023-2024, All Rights Reserved
      </section>
    </footer>
  )
}

export default Footer
