import styles from './LastUpdated.module.scss'

function LastUpdated() {
  const lastUpdated = Number(localStorage.getItem('lastUpdated'))

  const formatDate = last => {
    const date = new Date(last)
    const isPm = date.getHours() > 12
    return `${
      isPm ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${isPm ? 'pm' : 'am'}`
  }

  return (
    <div className={styles.updated}>
      <div className={styles.biggest}>
        <div className={styles.big}>
          <div className={styles.little} />
        </div>
      </div>
      <span className={styles.updatedText}>
        Last updated at {formatDate(lastUpdated)}
      </span>
    </div>
  )
}

export default LastUpdated
