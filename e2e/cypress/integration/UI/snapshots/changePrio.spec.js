import {getHrTabUrl} from "../../../support/utils";
import {getBoardMock} from "../../../fixtures/board";
import {hrTool, skillEl} from "../../../support/locators";
import {inputSkill} from "../../../support/complexLocators";

describe('change hr prio value', () => {
    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['processExecutions', 'id', 'process'], getBoardMock())
        cy.visit(getHrTabUrl('board'))
    })

    it('check boards card', () => {
        cy.getElement('avatar').should('be.visible')
        inputSkill(0).click()
        cy.get(hrTool.option).contains('2').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.getId('rc-tabs-1-panel-board').eq(0).matchImageSnapshot('trFirstTab')
    })
})