import Profile from '../../page_objects/profile'

describe('Smokes manager', () => {
  const managerProfile = new Profile()
  const employeeProfile = new Profile()

  beforeEach(() => {
    cy.setToken('manager')
    managerProfile.visit()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Opens profile by default', () => {
    managerProfile.url().should('include', '/client/profile')
    managerProfile.avatar().should('be.visible')
    managerProfile.name().should('contain', 'Test Manager')
    managerProfile.jobTitle().should('contain', 'Test')
    managerProfile.city().should('contain', 'Saint-Petersburg')
  })

  it('Manager can see own private tabs', () => {
    managerProfile.tabMatrices().should('be.visible')
    managerProfile.tabPersonalDevelopment().should('be.visible')
    managerProfile.tabSelfEvaluationForm().should('be.visible')
  })

  it('Manager can see employee private tabs', () => {
    cy.openProfile('test.employee')
    employeeProfile.tabMatrices().should('be.visible')
    employeeProfile.tabPersonalDevelopment().should('be.visible')
    employeeProfile.tabSelfEvaluationForm().should('be.visible')
  })
})
