import styles from './Cross.module.scss'

function Cross(props) {
  const { onModalClose } = props
  return (
    <div className={styles.cross} onClick={onModalClose} data-cy="cross">
      <span className={`${styles.crossPart} ${styles.toLeft}`} />
      <span className={`${styles.crossPart} ${styles.toRight}`} />
    </div>
  )
}

export default Cross
