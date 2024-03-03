import Logo from 'Assets/images/logo.svg'
import { useState } from 'react'
import useResize from 'Utils/hooks/useResize'

import { LEFT_BLOCK_TEXT, LINKS } from './Footer.config'
import styles from './Footer.module.scss'

function Footer() {
  const screenWidth = useResize()
  const [isUp, setIsUp] = useState(false)

  const onClickArrow = (item) => {
    setIsUp((prevIsUp) => {
      const newPrevIsUp = { ...prevIsUp }
      newPrevIsUp[item.title.toLowerCase()] = !prevIsUp[item.title.toLowerCase()]
      return newPrevIsUp
    })
  }

  const year = new Date(Date.now()).getFullYear()

  return (
    <footer>
      <div className="container">
        <div className={styles.inner}>
          <section className={styles.left}>
            <div className={styles.logo}>
              <Logo width={40} height={45} className={styles.logo} />
              <span className={styles.logoText}>Modsen Currency Tracker</span>
            </div>
            <p className={styles.text}>{LEFT_BLOCK_TEXT}</p>
          </section>
          <section className={styles.right}>
            <div className={styles.right}>
              {LINKS.map((item) => (
                <div className={styles.column} key={item.id}>
                  {screenWidth.width < 641 && (
                    <div className={styles.titleBlock}>
                      <span className={styles.title}>{item.title}</span>
                      <div
                        data-cy="footer-accordion-arrow"
                        className={
                          isUp[item.title.toLowerCase()]
                            ? `${styles.arrow} ${styles.up}`
                            : styles.arrow
                        }
                        onClick={() => onClickArrow(item)}
                      />
                    </div>
                  )}
                  {screenWidth.width > 641 && (
                    <>
                      <span className={styles.title}>{item.title}</span>
                      <div className={styles.links}>
                        <span className={styles.link}>{item.first}</span>
                        <span className={styles.link}>{item.second}</span>
                      </div>
                    </>
                  )}
                  {(isUp[item.title.toLowerCase()] || screenWidth > 641) && (
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
        Startsup &copy; {year - 1}-{year}, All Rights Reserved
      </section>
    </footer>
  )
}

export default Footer
