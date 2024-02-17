import currencies from '../../constants/currencies'
import icons from '../../constants/icons'
import styles from './CurrencyCard.module.scss'

function CurrencyCard({ setCardClicked, setShow, symbol, rate }) {
  return (
    <section
      className={styles.card}
      onClick={() => {
        setShow(true)
        setCardClicked({ rate, symbol })
      }}
    >
      <div className={styles.inner}>
        {icons[symbol]({ className: styles.icon })}
        <div className={styles.info}>
          <span className={styles.title}>{currencies[symbol]}</span>
          <span className={styles.rate}>R&#36; {rate}</span>
        </div>
      </div>
    </section>
  )
}

export default CurrencyCard
