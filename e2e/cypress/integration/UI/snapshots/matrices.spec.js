import { matrix } from '../../../fixtures/matrix'
import { experiences } from '../../../fixtures/experience'
import {getTabUrl} from '../../../support/utils'

describe('general matrix looks good', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.mockResponse(['getEmployeeExperiences'], experiences())
    cy.mockResponse(['getEmployeeMatrices'], matrix())

    cy.visit(getTabUrl('matrices'))

  })
  it('check all matrix', () => {
    cy.get('.ant-skeleton').should('not.exist')
    cy.get('.ant-tabs-card').matchImageSnapshot('generalMatrix')
  })
})
