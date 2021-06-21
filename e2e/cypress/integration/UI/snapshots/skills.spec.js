import { getEmployeeSkills } from '../../../fixtures/skills'
import {getTabUrl} from "../../../support/utils";

describe('skills tab looks god', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit(getTabUrl('skills'))

    cy.mockResponse(['getEmployeeExperiences'], getEmployeeSkills())
  })

  it('check all skills', () => {
    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')

    cy.getElement('allSkills').matchImageSnapshot('skills')
  })
})
