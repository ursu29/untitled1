import {getTabUrl} from "../../../support/utils";
import {getAgileManagers} from "../../../fixtures/agileManagers";

describe('agile managers boards looks good', () => {
    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['employees', 'agileManager'], getAgileManagers())

        cy.visit(getTabUrl('agile', 'management'))
        cy.get('.ant-skeleton').should('not.exist')
    })

    it('check agile managers cards', () => {
        cy.getIcon('right').eq(0).click()

        cy.getElement('agile').matchImageSnapshot('agileManagers', {blackout: ['.ant-avatar']})
    })
})