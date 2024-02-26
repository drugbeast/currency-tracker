import styles from './Message.module.scss'

function Message() {
  return (
    <div className={styles.inner}>
      <h1 className={styles.title}>Your chart was builded on 1-month dataset!</h1>
    </div>
  )
}

export default Message
