import {getBoardMock} from "../../../fixtures/board";

const {getHrTabUrl} = require("../../../support/utils");

describe('hr boards looks good', () => {
    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['processExecutions', 'id', 'process'], getBoardMock())
        cy.visit(getHrTabUrl('board'))

        cy.get('.ant-skeleton').should('be.visible')
        cy.get('.ant-skeleton').should('not.exist')
    })

    it('check boards cards', () => {
        cy.getElement('avatar').should('be.visible')

        cy.getId('rc-tabs-1-panel-board').matchImageSnapshot('hrBoard')
    })
})