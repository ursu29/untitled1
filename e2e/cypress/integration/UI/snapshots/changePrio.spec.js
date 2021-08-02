import {getTabUrl} from "../../../support/utils";
import {getBoardMock} from "../../../fixtures/board";
import {hrTool} from "../../../support/locators";

describe('change hr prio value', () => {
    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['processExecutions', 'id', 'process'], getBoardMock())
        cy.visit(getTabUrl('board', 'hr'))
    })

    it('check boards card', () => {
        cy.getElement('prioValue').eq(0).click()
        cy.get(hrTool.option).contains('2').click()

        cy.getId('rc-tabs-1-panel-board').eq(0).matchImageSnapshot('trFirstTab')
    })
})