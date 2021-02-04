import {getDevPlans} from "../../../fixtures/devPlan";
import {getReviewers} from "../../../fixtures/getReviewers";

describe('personal dev plans looks good', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/profile/development-plan')

        cy.mockResponse(['getDevelopmentPlans'], getDevPlans())
        cy.mockResponse(['getEmployees', 'employeeByEmail'], getReviewers())
    })

    it('check all plan', () => {
        cy.get('.ant-skeleton').should('be.visible')
        cy.get('.ant-skeleton').should('not.exist')
        cy.getElement('allEvaluation').matchImageSnapshot('evaluation-form')
    })

    it('check two reviewers', () => {
        cy.get('.ant-skeleton').should('not.exist')
        cy.getElement('reviewers').matchImageSnapshot('reviewers')
        cy.getElement('lastDiscussed').matchImageSnapshot('lastDiscussed')
    })
})
