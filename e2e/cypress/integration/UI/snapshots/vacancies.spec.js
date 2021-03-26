import { getMockVacancies } from '../../../fixtures/vacancies'
import {menuEl} from "../../../support/locators";

describe('vacancy tab looks god', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit('/')
  })

  it('check vacancy data', () => {
    cy.get(menuEl.item).contains('Vacancies').click()

    cy.mockResponse(['getVacancies', 'employeeExperience'], getMockVacancies())

    cy.get('.ant-btn-link').eq(0).click()

    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')

    cy.getElement('vacancy').matchImageSnapshot('vacancy')
  })
})
