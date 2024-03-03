beforeEach(() => {
  cy.visit('/')
})

describe('visit pages', () => {
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
    cy.get('html[data-theme="dark"]').should('have.length', 1)
    cy.get('input[type="checkbox"]')
      .invoke('attr', 'style', 'visibility: visible; width: 10px; height: 10px;')
      .check()
    cy.get('html[data-theme="light"]').should('have.length', 1)
  })
})

describe('mobile features', () => {
  it('should open burger menu', () => {
    cy.viewport('iphone-6+')
    cy.get('[data-cy="burger"]').click()
    cy.get('[data-cy="burger-menu-wrapper"]').should('be.visible')
  })
  it('should open accordeon', () => {
    cy.viewport('iphone-6+')
    cy.get('[data-cy="footer-accordion-arrow"]').click({
      multiple: true,
      force: true,
    })
  })
})
