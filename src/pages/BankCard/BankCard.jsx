import Map from 'Components/BankCard/Map/Map'
import SearchBar from 'Components/BankCard/SearchBar/SearchBar'
import { Component } from 'react'

import styles from './BankCard.module.scss'

class BankCard extends Component {
  constructor(props) {
    super(props)
    this.state = { searchValue: '', doSearch: false }
  }

  setSearchValue = (value) => {
    this.setState({ searchValue: value })
  }

  render() {
    const { searchValue, doSearch } = this.state
    return (
      <article className={styles.wrapper}>
        <div className="container">
          <section className={styles.inner}>
            <p className={styles.title}>Search currency in the bank</p>
            <SearchBar setSearchValue={this.setSearchValue} />
          </section>
        </div>
        <Map searchValue={searchValue} doSearch={doSearch} />
      </article>
    )
  }
}

export default BankCard
