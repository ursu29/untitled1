import { getEmployeeSkills } from '../../../fixtures/skills'

describe('skills tab looks god', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit('/profile')

    cy.mockResponse(['getEmployeeExperiences'], getEmployeeSkills())
  })

  it('check all skills', () => {
    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')

    cy.getElement('allSkills').matchImageSnapshot('skills')
  })
})
