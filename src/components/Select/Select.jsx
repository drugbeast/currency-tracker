import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import currencies from '../../constants/currencies'
import styles from './Select.module.scss'

function Select(props) {
  const { setCurrency } = props
  const [isClicked, setClicked] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.values(currencies)[0],
  )

  return (
    <section className={styles.select}>
      <div
        className={
          isClicked
            ? [styles.field, styles.up].join(' ')
            : [styles.field, styles.down].join(' ')
        }
        onClick={() => setClicked(!isClicked)}
      >
        {selectedCurrency.length > 13
          ? `${selectedCurrency.substring(0, 12)}...`
          : selectedCurrency}
      </div>
      <div
        className={
          isClicked
            ? [styles.pop, styles.enabled].join(' ')
            : [styles.pop, styles.disabled].join(' ')
        }
      >
        {Object.values(currencies).map(value => (
          <div
            key={uuidv4()}
            className={styles.option}
            onClick={e => {
              setSelectedCurrency(e.target.textContent)
              setClicked(!isClicked)
              setCurrency(e.target.textContent)
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Select
