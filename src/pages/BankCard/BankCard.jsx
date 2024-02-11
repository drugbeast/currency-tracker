import { Component } from 'react'

import Map from '../../components/Map/Map'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './BankCard.module.scss'

class BankCard extends Component {
  constructor(props) {
    super(props)
    this.state = { searchValue: '', doSearch: false }
  }

  setSearchValue = value => {
    this.setState({ searchValue: value })
  }

  render() {
    return (
      <article className={styles.block}>
        <div className="container">
          <section className={styles.inner}>
            <p className={styles.title}>Search currency in the bank</p>
            <SearchBar setSearchValue={this.setSearchValue} />
          </section>
        </div>
        <Map {...this.state} />
      </article>
    )
  }
}

export default BankCard
