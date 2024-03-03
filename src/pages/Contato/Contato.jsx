import Footer from 'Components/Layout/Footer/Footer'
import Header from 'Components/Layout/Header/Header'
import { Component } from 'react'

import { REQUISITES } from './Contato.config'
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
                    {REQUISITES.map((prop) => (
                      <p className={styles.inf} key={prop.id}>
                        <span className={styles.informationPart}>
                          {prop.informationPartName}:
                        </span>{' '}
                        {prop.informationPartValue}
                      </p>
                    ))}
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
