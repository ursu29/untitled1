import {wikiData} from "../../../fixtures/wiki";

describe('wiki tab looks god', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/wiki')

        cy.mockResponse(['wikiRootSections'], wikiData())
    })

    it('check all wiki page', () => {
        cy.get('div').find('img').should('be.visible')


        cy.get('.ant-layout-content').matchImageSnapshot('wiki')
    })
})
