import styles from './CurrencyCard.module.scss'

function CurrencyCard({ icon, rate, title }) {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        {icon}
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.rate}>R&#36; {rate}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrencyCard
