import Employees from '../../page_objects/employees'
import Profile from '../../page_objects/profile'

// todo add data-cy to production code. see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
describe('Employees', () => {
  const employees = new Employees()
  const profile = new Profile()

  beforeEach(() => {
    cy.setToken('employee')
    employees.visit()
  })

  it('Table of employees has some data', () => {
    employees.row().its('length').should('be.greaterThan', 2)
  })

  it('Filter the employees table by name', () => {
    employees.searchField().type('Test E')
    employees.row().its('length').should('eq', 2)
    employees.row().first().find('td').eq(1).should('have.text', 'Test Employee')
  })

  it('Filter the employees table by position', () => {
    employees.selectPosition('Java Developers')
    employees.checkDisplayedRowsContainText(/Java Developer|Java developer|java developer/)
  })

  it('Filter the employees table by level', () => {
    employees.selectLevel('Senior')
    employees.checkDisplayedRowsContainText(/Senior/)
  })

  it('Filter the employees table by location', () => {
    employees.selectLocation('Kaliningrad')
    employees.checkDisplayedRowsContainText(/Kaliningrad/)
  })

  it('Open a user profile from the table', () => {
    employees.currentUserAvatar().click()
    profile.url().should('include', '/client/profile')
    profile.name().should('contain', 'Test Employee')
  })
})
