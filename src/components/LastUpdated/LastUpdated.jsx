import styles from './LastUpdated.module.scss'

function LastUpdated() {
  let lastUpdated = Number(localStorage.getItem('lastUpdated'))
  if (Date.now() - lastUpdated > 100000000) {
    lastUpdated = Date.now()
    localStorage.setItem('lastUpdated', lastUpdated)
  }

  const formatDate = last => {
    const date = new Date(last)
    const isPm = date.getHours() > 12
    return `${
      isPm ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${isPm ? 'pm' : 'am'}`
  }

  return (
    <section className={styles.updated}>
      <div className={styles.biggest}>
        <div className={styles.big}>
          <div className={styles.little} />
        </div>
      </div>
      <span className={styles.updatedText}>
        Last updated at {formatDate(lastUpdated)}
      </span>
    </section>
  )
}

export default LastUpdated
