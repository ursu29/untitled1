describe('wiki tab looks god', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/wiki')
    })

    it('check all wiki page', () => {
        cy.get('div').find('img').should('be.visible').and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
        cy.wait(500)

        cy.get('.ant-layout-content').matchImageSnapshot('wiki')
    })
})
