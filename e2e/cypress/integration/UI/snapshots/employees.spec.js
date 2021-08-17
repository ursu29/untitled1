import {employees} from "../../../fixtures/employees";

describe('Visual regression employees page', () => {
    before(() => {
        cy.setToken('employee')

        cy.mockResponse(['location', 'country', 'id', 'name'], employees())
        cy.visit('/employees')
    })


        it(`Should match previous screenshot employees Page`, () => {
            cy.get('.ant-skeleton').should('not.exist')

            cy.snapshot('.ant-table-container', 'employees')
        });
});