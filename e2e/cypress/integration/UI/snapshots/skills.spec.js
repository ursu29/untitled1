import { getEmployeeSkills } from '../../../fixtures/skills'
import { getSubTabUrl } from '../../../support/utils'

describe('skills tab looks god', () => {
  before(() => {
    cy.setToken('employee')

    cy.visit(getSubTabUrl('career', '/profile', 'skills'))

    cy.mockResponse(['getEmployeeExperiences'], getEmployeeSkills())
  })

  it('check all skills', () => {
    cy.snapshot('allSkills', 'skills')
  })
})
