import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import currencies from '../../constants/currencies'
import icons from '../../constants/icons'
import { CurrenciesContext } from '../../pages/Home/Home'
import Modal from '../Modal/Modal'
import styles from './CurrencyCard.module.scss'

function CurrencyCard() {
  const [isClicked, setClicked] = useState(false)
  const { symbol, rate } = useContext(CurrenciesContext)

  const onPress = e => {
    if (e.key === 'Escape') {
      setClicked(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onPress)
    return () => document.removeEventListener('keydown', onPress)
  }, [])

  return (
    <section className={styles.card} onClick={() => setClicked(true)}>
      {isClicked && createPortal(<Modal />, document.body)}
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
