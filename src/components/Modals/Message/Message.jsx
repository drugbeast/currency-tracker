import styles from './Message.module.scss'

function Message() {
  return (
    <h1 className={styles.title} data-cy="timeline-modal-message-title">
      Your chart was builded on 1-month dataset!
    </h1>
  )
}

export default Message
