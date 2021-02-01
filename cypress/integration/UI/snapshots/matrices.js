import {matrix} from "../../../fixtures/matrix";
import {experiences} from "../../../fixtures/experience";

describe('general matrix looks good', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/profile/matrices')

        cy.mockResponse(['getEmployeeExperiences'], experiences())
        cy.mockResponse(['getEmployeeMatrices'], matrix())
        })
    it('check all matrix', () => {
        cy.get('.ant-skeleton').should('be.visible')
        cy.get('.ant-skeleton').should('not.exist')
        cy.get('.ant-tabs-card').matchImageSnapshot('general-matrix')
    })
})

