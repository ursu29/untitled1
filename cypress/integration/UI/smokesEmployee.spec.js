import Profile from '../../page_objects/profile'

// todo add data-cy to production code. see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
describe('Smokes employee', () => {
  const employeeProfile = new Profile()

  beforeEach(() => {
    cy.setToken('employee')
    employeeProfile.visit()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Opens own profile by default', () => {
    employeeProfile.url().should('include', '/client/profile')
    employeeProfile.avatar().should('be.visible')
    employeeProfile.name().should('contain', 'Test Employee')
    employeeProfile.jobTitle().should('contain', 'Test')
    employeeProfile.city().should('contain', 'Saint-Petersburg')
  })

  it('Profile include info and link to manager page', () => {
    employeeProfile.managerName().click()
    employeeProfile.url().should('include', '/client/employees/test.manager@sidenis.com/')
    employeeProfile.name().should('contain', 'Test Manager')
  })

  it('Employee can see own private tabs', () => {
    employeeProfile.tabMatrices().should('be.visible')
    employeeProfile.tabPersonalDevelopment().should('be.visible')
    employeeProfile.tabSelfEvaluationForm().should('be.visible')
  })

  it('Employee cannot see manager private tabs', () => {
    employeeProfile.openManagerOfCurrentProfile()
    employeeProfile.tabMatrices().should('not.exist')
    employeeProfile.tabPersonalDevelopment().should('not.exist')
    employeeProfile.tabSelfEvaluationForm().should('not.exist')
  })
})
