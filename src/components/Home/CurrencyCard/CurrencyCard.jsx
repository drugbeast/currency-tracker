import { CURRENCIES_SECOND_FORM } from 'Constants/constants'
import icons from 'Constants/icons'
import { memo } from 'react'

import styles from './CurrencyCard.module.scss'

const CurrencyCard = memo((props) => {
  const { setCardClicked, setShow, symbol, rate } = props
  const onCardClick = () => {
    setShow(true)
    setCardClicked({ rate: Number(rate), symbol })
  }
  return (
    <section className={styles.card} onClick={onCardClick} data-cy="card">
      <div className={styles.inner}>
        {icons[symbol]({ className: styles.icon })}
        <div className={styles.info}>
          <span className={styles.title}>{CURRENCIES_SECOND_FORM[symbol]}</span>
          <span className={styles.rate}>R&#36; {rate}</span>
        </div>
      </div>
    </section>
  )
})

export default CurrencyCard
