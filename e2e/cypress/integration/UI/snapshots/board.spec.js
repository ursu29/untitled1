import {getBoardMock} from "../../../fixtures/board";
import {getTabUrl} from "../../../support/utils";

describe('hr boards looks good', () => {
    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['processExecutions', 'id', 'process'], getBoardMock())
        cy.visit(getTabUrl('board', 'hr'))

        cy.get('.ant-skeleton').should('not.exist')
    })

    it('check boards cards', () => {
        cy.get('.ant-avatar-circle').find('img').should('be.visible').and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
        cy.wait(500)

        cy.getId('rc-tabs-1-panel-board').matchImageSnapshot('hrBoard')
    })
})