import styles from './Cross.module.scss'

function Cross(props) {
  const { setShow } = props
  return (
    <div className={styles.cross} onClick={() => setShow(false)}>
      <span className={[styles.crossPart, styles.toLeft].join(' ')} />
      <span className={[styles.crossPart, styles.toRight].join(' ')} />
    </div>
  )
}

export default Cross
