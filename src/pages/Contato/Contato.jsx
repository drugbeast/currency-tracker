import { Component } from 'react'

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import styles from './Contato.module.scss'

class Contato extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <Header />

        <main className={styles.content}>
          <div className="container">
            <div className={styles.information}>
              <div className={styles.left}>
                <span className={styles.title}>Our contacts</span>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <div className={styles.contacts}>
                    <span className={styles.inf}>
                      <span className={styles.property}>City:</span> New York
                    </span>
                    <span className={styles.inf}>
                      <span className={styles.property}>Phone:</span> (555) 555-1234
                    </span>
                    <span className={styles.inf}>
                      <span className={styles.property}>CEO:</span> Gerry Weber
                    </span>
                    <span className={styles.inf}>
                      <span className={styles.property}>Email:</span>{' '}
                      modsencurrencytracker@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

export default Contato
