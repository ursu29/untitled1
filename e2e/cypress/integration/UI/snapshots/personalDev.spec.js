import { getDevPlans } from '../../../fixtures/devPlan'
import { getReviewers } from '../../../fixtures/getReviewers'
import { getSubTabUrl } from '../../../support/utils'

describe('personal dev plans looks good', () => {
  before(() => {
    cy.setToken('employee')

    cy.visit(getSubTabUrl('career', '/profile', 'development-plan'))

    cy.mockResponse(['getDevelopmentPlans'], getDevPlans())
    cy.mockResponse(['getEmployees', 'employeeByEmail'], getReviewers())
  })

  it('check all plan', () => {
    cy.getElement('allEvaluation').matchImageSnapshot('evaluation-form')
    cy.get('.ant-skeleton').should('not.exist')

    cy.getElement('reviewers').matchImageSnapshot('reviewers')
    cy.getElement('lastDiscussed').matchImageSnapshot('lastDiscussed')
  })
})
