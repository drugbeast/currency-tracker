import { useState } from 'react'

import { iconsNames } from '../../constants/icons'
import styles from './Select.module.scss'

function Select() {
  const [isPop, setPop] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.values(iconsNames)[0],
  )

  return (
    <div className={styles.select}>
      <div className={styles.field} onClick={() => setPop(!isPop)}>
        {selectedCurrency.length > 13
          ? `${selectedCurrency.substring(0, 12)}...`
          : selectedCurrency}
      </div>
      <div className={isPop ? styles.popEnabled : styles.popDisabled}>
        {Object.values(iconsNames).map(value => (
          <div
            className={styles.option}
            onClick={e => {
              setSelectedCurrency(e.target.textContent)
              setPop(!isPop)
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Select
