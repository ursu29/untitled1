describe('wiki tab looks god', () => {
    before(() => {
        cy.setToken('employee')

        cy.visit('/wiki')
    })

    it('check all wiki page', () => {
        cy.snapshot('.ant-layout-content', 'wiki')
    })
})
