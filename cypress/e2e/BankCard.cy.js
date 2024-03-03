import { MESSAGE } from '../../src/components/BankCard/SearchBar/SearchBar.config'

beforeEach(() => {
  cy.visit('/bankCard')
})

describe('card exists', () => {
  it('should be on the page', () => {
    cy.get('[aria-label="Map"]')
  })
  it('should have markers', () => {
    cy.get('[aria-label="Map marker"]')
  })
})

describe('elastic search', () => {
  it('should present variants according to input value', () => {
    const wordToType = 'aud'
    cy.get('[data-cy="elastic-search-input"]').type(wordToType)
    cy.get('[data-cy="currency-card-appeared"]').click({ force: true })
  })
  it('should show error message if there is no currencies match', () => {
    const wordToType = 'aaa'
    cy.get('[data-cy="elastic-search-input"]').type(wordToType)
    cy.get('[data-cy="bankCard-error"]').contains(MESSAGE)
  })
})
