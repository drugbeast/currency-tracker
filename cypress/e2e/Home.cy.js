describe('Visit pages', () => {
  it('should visit home page', () => {
    cy.visit('/')
  })
  it('should visit timeline page', () => {
    cy.visit('/timeline')
  })
  it('should visit bank card page', () => {
    cy.visit('/bankCard')
  })
  it('should visit contato page', () => {
    cy.visit('/contato')
  })
})

describe('switch theme', () => {
  it('should switch theme', () => {
    cy.visit('/')
    cy.get('html[data-theme="dark"]').should('have.length', 1)
    cy.get('input[type="checkbox"]')
      .invoke('attr', 'style', 'visibility: visible; width: 10px; height: 10px;')
      .check()
    cy.get('html[data-theme="light"]').should('have.length', 1)
  })
})

describe('count cards', () => {
  it('should have 9 currencies', () => {
    cy.visit('/')
    cy.request(
      `https://api.currencybeacon.com/v1/latest?api_key=${Cypress.env('CURRENCYBEACON_API_KEY')}`,
    )
    cy.get('.VfPjk0mtrcVtih9dr2OA').should('have.length', 9)
  })
})

describe('mobile features', () => {
  it('should open burger menu', () => {
    cy.visit('/')
    cy.viewport('iphone-6+')
    cy.get('.Y1f8wEpzzxfnaXm8QKRP').click()
    cy.get('.d6dPoAK_OMnGUb5rWSA9').should('be.visible')
  })
})
