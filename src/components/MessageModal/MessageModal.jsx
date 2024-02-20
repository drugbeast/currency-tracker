import Cross from '../Cross/Cross'
import styles from './MessageModal.module.scss'

function MessageModal({ setShowMessageModal }) {
  return (
    <article className={styles.container}>
      <div className={styles.window}>
        <Cross setShow={setShowMessageModal} />
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Your chart was builded on 1-month dataset!
          </h1>
        </div>
      </div>
    </article>
  )
}

export default MessageModal
