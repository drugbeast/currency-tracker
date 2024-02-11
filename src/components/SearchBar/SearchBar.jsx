/* eslint-disable operator-linebreak */
import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Search from '../../assets/images/search.svg'
import currencies from '../../constants/currencies'
import styles from './SearchBar.module.scss'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '', currenciesAppeared: [] }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state
    if (prevState.inputValue !== inputValue) {
      this.checkTheOccurence()
    }
  }

  checkTheOccurence = () => {
    const { inputValue } = this.state
    const newCurrenciesAppeared = []
    Object.entries(currencies).filter(item =>
      item[0].toLowerCase().includes(inputValue.toLowerCase()) ||
      item[1].toLowerCase().includes(inputValue.toLowerCase())
        ? newCurrenciesAppeared.push(item)
        : null,
    )
    this.setState({ currenciesAppeared: newCurrenciesAppeared })
  }

  setInputValue = value => {
    this.setState({ inputValue: value })
  }

  render() {
    const { inputValue, currenciesAppeared } = this.state
    const { setSearchValue } = this.props
    return (
      <section className={styles.bar}>
        <div className={styles.inner}>
          <Search
            width={24}
            height={24}
            className={styles.icon}
            onClick={() => {
              setSearchValue(inputValue)
              this.setState({ currenciesAppeared: [] })
            }}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Currency search..."
            value={inputValue}
            onChange={e => this.setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                this.setState({ currenciesAppeared: [] })
              }
              if (e.key === 'Enter') {
                setSearchValue(inputValue)
                this.setState({ currenciesAppeared: [] })
              }
            }}
          />
          {currenciesAppeared.length !== 0 && (
            <div className={styles.cards}>
              {currenciesAppeared.map(item => (
                <div
                  key={uuidv4()}
                  className={styles.card}
                  onClick={() => {
                    this.setInputValue(item[1])
                    setSearchValue(item[1])
                    this.setState({ currenciesAppeared: [] })
                  }}
                >
                  {item[1]}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default SearchBar
