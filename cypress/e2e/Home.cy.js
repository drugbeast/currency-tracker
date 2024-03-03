import { RATES_FOR_TESTS } from '../../src/constants/constants'

beforeEach(() => {
  cy.visit('/')
})

describe('converter modal window', () => {
  it('should open and close converter modal window', () => {
    cy.get('[data-cy="card"]').click({ multiple: true, force: true })
    cy.get('[data-cy="converter-modal-wrapper"]')
    cy.get('[data-cy="cross"]').click({ multiple: true, force: true })
  })
  it('should have a correct converter', () => {
    const from = 123
    const currency = 'AUD'
    const expectedResult =
      (RATES_FOR_TESTS.filter((item) => item.symbol === currency)[0].rate * from) /
      RATES_FOR_TESTS[RATES_FOR_TESTS.length - 1].rate
    cy.get('[data-cy="card"]').click({ multiple: true, force: true })
    cy.get('[data-cy="converter-input"]').clear().type(from)
    cy.get('[data-cy="converter-select"]').select(currency)
    cy.get('[data-cy="conversion-result"]').should(
      'have.text',
      `${expectedResult.toFixed(3)} ${currency}`,
    )
  })
})
