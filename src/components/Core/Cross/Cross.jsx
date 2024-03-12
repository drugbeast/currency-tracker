import styles from './Cross.module.scss'

function Cross(props) {
  const { onModalClose } = props
  return (
    <div
      className={styles.cross}
      onClick={onModalClose}
      data-cy="cross"
      data-testid="cross"
    >
      <span
        className={`${styles.crossPart} ${styles.toLeft}`}
        data-testid="left-part"
      />
      <span
        className={`${styles.crossPart} ${styles.toRight}`}
        data-testid="right-part"
      />
    </div>
  )
}

export default Cross
