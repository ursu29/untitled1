import {employees} from "../../../fixtures/employees";

describe('Visual regression employees page', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/employees')

        cy.mockResponse(['location', 'country'], employees())
    })


        it(`Should match previous screenshot employees Page`, () => {
            cy.get('.ant-skeleton').should('be.visible')
            cy.get('.ant-skeleton').should('not.exist')
            cy.get('.ant-avatar-image').eq(0).should('be.exist')

            cy.matchImageSnapshot();
        });
});