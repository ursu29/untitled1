import { getCv } from '../../../fixtures/cv'

describe('cv table looks good', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit('/profile/cv')

    cy.mockResponse(['getEmployeeCV'], getCv())
  })
  it('check all matrix', () => {
    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')
    cy.getElement('cvForm').matchImageSnapshot('cv')
  })
})
