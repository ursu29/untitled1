import { getMockVacancies } from '../../../fixtures/vacancies'

describe('vacancy tab looks god', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit('/vacancies')
  })

  it('check vacancy data', () => {
    cy.mockResponse(['getVacancies'], getMockVacancies())

    cy.get('.ant-btn-link').eq(0).click()

    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')

    cy.getElement('vacancy').matchImageSnapshot('vacancy')
  })
})
