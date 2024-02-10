import Logo from '../../assets/images/logo.svg'
import styles from './Banner.module.scss'

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={[styles.title, styles.small].join(' ')}>
            Modsen Currency
          </p>
          <p className={[styles.title, styles.big].join(' ')}>Tracker</p>
          <p className={styles.text}>
            Quotes for the dollar and other
            <br />
            international currencies.
          </p>
        </div>
        <div className={styles.right}>
          <Logo width={300} height={312} />
        </div>
      </div>
    </section>
  )
}

export default Banner
