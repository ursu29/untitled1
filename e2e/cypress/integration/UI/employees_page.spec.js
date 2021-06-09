describe('Employees', () => {
  const text = 'Test E'
  const selectProfileName = 'Test Employee'
  const profileName = /Java Developer|Java developer|java developer/
  const profileLevel = /Senior/

  before(() => {
    cy.setToken('employee')
    cy.visit('/employees')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Table of employees has some data', () => {
    cy.get('[data-row-key]').its('length').should('be.greaterThan', 2)
  })

  it('Filter the employees table by name', () => {
    cy.getElement('search').type(text)
    cy.getElement('employee_table').contains('td', selectProfileName)
    cy.getElement('search').clear()
  })

  it('Filter the employees table by position/level', () => {
    ;[profileName, profileLevel].forEach((el, idx) => {
      cy.getIcon('filter').eq(idx).click()
      cy.clickElement(el)
      cy.contains('OK').click({force: true})
      cy.matchText('[data-row-key]', el)
    })
  })

  it('Open a user profile from the table', () => {
    cy.getElement('profile').click()
    cy.url().should('include', '/profile')
    cy.getElement('profile_name').should('have.text', selectProfileName)
    cy.clickElement('Employees')
  })
})
