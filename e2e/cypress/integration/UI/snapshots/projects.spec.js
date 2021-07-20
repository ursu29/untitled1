
describe('Visual regression projects page', () => {
    before(() => {
        cy.setToken('employee')

        cy.visit('/projects')
    })


    it(`Should match previous screenshot projects Page'`, () => {
        cy.getElement('project').should('be.visible')
        cy.get('.ant-card-body').last().matchImageSnapshot()
    });
});