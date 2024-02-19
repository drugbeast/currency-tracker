import { PacmanLoader } from 'react-spinners'

import styles from './Loader.module.scss'

function Loader() {
  return (
    <section className={styles.block}>
      <PacmanLoader color="rgba(0, 188, 79, 1)" />
    </section>
  )
}

export default Loader
