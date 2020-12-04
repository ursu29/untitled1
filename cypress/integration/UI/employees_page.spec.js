describe('Employees', () => {
  const text = 'Test E'
  const selectProfileName = 'Test Employee'
  const profileName = /Java Developer|Java developer|java developer/
  const profileLevel = /Senior/
  const city = /Kaliningrad/

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
    cy.getElement('find_employee').type(text)
    cy.getElement('employee_table').contains('td', selectProfileName)
    cy.getElement('find_employee').clear()
  })

  it('Filter the employees table by position', () => {
    cy.selectFilterValue('employee_table', 'Position', profileName)
    cy.matchText('[data-row-key]', profileName)
  })

  it('Filter the employees table by level', () => {
    cy.selectFilterValue('employee_table', 'Level', profileLevel)
    cy.matchText('[data-row-key]', profileLevel)
  })

  it('Filter the employees table by location', () => {
    cy.selectFilterValue('employee_table', 'Location', city)
    cy.matchText('[data-row-key]', city)
  })

  it('Open a user profile from the table', () => {
    cy.getElement('profile').click()
    cy.url().should('include', '/profile')
    cy.getElement('profile_name').should('have.text', selectProfileName)
    cy.clickElement('Employees')
  })
})
