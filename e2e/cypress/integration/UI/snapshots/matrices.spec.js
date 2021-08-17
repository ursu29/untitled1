import { matrix } from '../../../fixtures/matrix'
import { experiences } from '../../../fixtures/experience'
import { getSubTabUrl } from '../../../support/utils'

describe('general matrix looks good', () => {
  before(() => {
    cy.setToken('employee')

    cy.mockResponse(['getEmployeeExperiences'], experiences())
    cy.mockResponse(['getEmployeeMatrices'], matrix())

    cy.visit(getSubTabUrl('career', '/profile', 'matrices'))

  })
  it('check all matrix', () => {
    cy.get('.ant-skeleton').should('not.exist')

    cy.snapshot('.ant-tabs-card', 'generalMatrix')
  })
})
