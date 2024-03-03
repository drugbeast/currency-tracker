import Search from 'Assets/images/search.svg'
import { CURRENCIES_FIRST_FORM } from 'Constants/constants'
import { Component, createRef } from 'react'

import Input from '../Input/Input'
import { MESSAGE } from './SearchBar.config'
import styles from './SearchBar.module.scss'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      currenciesAppeared: [],
      displayVariants: false,
    }
    this.inputRef = createRef(null)
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
    CURRENCIES_FIRST_FORM.filter((currency) =>
      currency.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
      currency.name.toLowerCase().includes(inputValue.toLowerCase())
        ? newCurrenciesAppeared.push(currency)
        : null,
    )
    this.setState({
      currenciesAppeared: newCurrenciesAppeared,
      displayVariants: true,
    })
  }

  setInputValue = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleSearch = () => {
    const { setSearchValue } = this.props
    const { inputValue } = this.state
    setSearchValue(inputValue)
    this.setState({ displayVariants: false })
  }

  handleClickCard = (currency) => {
    const { setSearchValue } = this.props
    setSearchValue(currency.name)
    this.setState({ inputValue: currency.name, displayVariants: false })
    this.inputRef.current.blur()
  }

  handleKeyDown = (e) => {
    const { setSearchValue } = this.props
    const { inputValue } = this.state
    if (e.key === 'Escape') {
      this.setState({ displayVariants: false })
    }
    if (e.key === 'Enter') {
      setSearchValue(inputValue)
      this.setState({ displayVariants: false })
    }
  }

  render() {
    const { inputValue, currenciesAppeared, displayVariants } = this.state
    return (
      <section className={styles.bar}>
        <div className={styles.inner}>
          <Search
            width={24}
            height={24}
            className={styles.icon}
            onClick={this.handleSearch}
            data-cy="search-icon"
          />
          <Input
            type="text"
            className="elastic-search-input"
            placeholder="Currency search..."
            value={inputValue}
            onChange={this.setInputValue}
            onKeyDown={this.handleKeyDown}
            dataCy="elastic-search-input"
            ref={this.inputRef}
          />
          {currenciesAppeared.length !== 0 && (
            <div
              className={
                displayVariants
                  ? styles.cards
                  : `${styles.cards} ${styles.disabled}`
              }
            >
              {currenciesAppeared.map((currency) => (
                <div
                  key={currency.id}
                  className={styles.card}
                  onClick={() => this.handleClickCard(currency)}
                  data-cy="currency-card-appeared"
                >
                  {currency.name}
                </div>
              ))}
            </div>
          )}
          {currenciesAppeared.length === 0 && inputValue !== '' && (
            <span className={styles.message} data-cy="bankCard-error">
              {MESSAGE}
            </span>
          )}
        </div>
      </section>
    )
  }
}

export default SearchBar
