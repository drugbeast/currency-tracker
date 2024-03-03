beforeEach(() => {
  cy.visit('/timeline')
})

describe('check select functionality', () => {
  it('should select another currency for chart', () => {
    const currencyName = 'Canadian Dollar'
    const currencySymbol = 'CAD'
    cy.get('[data-cy="timeline-select"]').click()
    cy.get('[data-cy="timeline-select-pop-up"]').contains(currencyName).click()
    cy.get('[data-cy="timeline-currency-card-title').contains(currencySymbol)
  })
})

describe('check add, edit, delete', () => {
  it('should add another day', () => {
    const currency = 'aud'
    const mockDataforAdd = {
      open: 1.10234,
      high: 1.05757,
      close: 1.19342,
      low: 1.09384,
    }
    cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`).then((response) => {
      const daysBefore = response.body.length
      cy.get('[data-cy="timeline-add-button"]').click()
      cy.get('[data-cy="timeline-open-input"]').type(mockDataforAdd.open)
      cy.get('[data-cy="timeline-high-input"]').type(mockDataforAdd.high)
      cy.get('[data-cy="timeline-close-input"]').type(mockDataforAdd.close)
      cy.get('[data-cy="timeline-low-input"]').type(mockDataforAdd.low)
      cy.get('[data-cy="timeline-modal-action"]').click()
      cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`)
        .then((responseAfter) => responseAfter.body.length)
        .catch((e) => e)
        .should('deep.equal', daysBefore + 1)
    })
  })

  it('should delete last day', () => {
    const currency = 'aud'
    cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`).then((response) => {
      const daysBefore = response.body.length
      cy.get('[data-cy="timeline-delete-button"]').click()
      cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`)
        .then((responseAfter) => responseAfter.body.length)
        .should('deep.equal', daysBefore - 1)
    })
  })

  it('should edit selected day', () => {
    const currency = 'aud'
    const day = 5
    const mockDataforEdit = {
      open: 2.10234,
      high: 2.05757,
      close: 2.19342,
      low: 2.09384,
    }
    cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`).then((response) => {
      const dayBefore = response.body[day - 1]
      cy.get('[data-cy="timeline-edit-button"]').click()
      cy.get('[data-cy="timeline-edit-day-input"]').clear().type(day)
      cy.get('[data-cy="timeline-edit-open-input"]')
        .clear()
        .type(mockDataforEdit.open)
      cy.get('[data-cy="timeline-edit-high-input"]')
        .clear()
        .type(mockDataforEdit.high)
      cy.get('[data-cy="timeline-edit-close-input"]')
        .clear()
        .type(mockDataforEdit.close)
      cy.get('[data-cy="timeline-edit-low-input"]')
        .clear()
        .type(mockDataforEdit.low)
      cy.get('[data-cy="timeline-edit-action"]').click()
      cy.request(`${Cypress.env('MOCKAPI_REQUEST')}${currency}`)
        .then((responseAfter) => JSON.stringify(responseAfter.body[day - 1]))
        .should('deep.equal', JSON.stringify(dayBefore))
    })
  })
})

describe('show a message about that chart was builded on 30-days dataset', () => {
  const mockDataforAdd = {
    open: 1.10234,
    high: 1.05757,
    close: 1.19342,
    low: 1.09384,
  }
  it('should show message', () => {
    const delay = 2000
    cy.wait(delay)
    cy.get('[data-cy="timeline-add-button"]').click()
    cy.get('[data-cy="timeline-add-open-input"]').type(mockDataforAdd.open)
    cy.get('[data-cy="timeline-add-high-input"]').type(mockDataforAdd.high)
    cy.get('[data-cy="timeline-add-close-input"]').type(mockDataforAdd.close)
    cy.get('[data-cy="timeline-add-low-input"]').type(mockDataforAdd.low)
    cy.get('[data-cy="timeline-add-modal-action"]').click()
    cy.get('[data-cy="timeline-modal-message-title"]')
    cy.get('[data-cy="cross"]').click()
  })
})
