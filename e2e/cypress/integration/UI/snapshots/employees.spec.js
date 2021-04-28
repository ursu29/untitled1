import {employees} from "../../../fixtures/employees";

describe('Visual regression employees page', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.mockResponse(['location', 'country', 'id', 'name'], employees())
        cy.visit('/employees')
    })


        it(`Should match previous screenshot employees Page`, () => {
            cy.get('.ant-skeleton').should('not.exist')
            cy.get('.ant-avatar-image').eq(0).should('be.exist')
            // eslint-disable-next-line
            cy.wait(1000) // need to fined a new solution

            cy.matchImageSnapshot();
        });
});