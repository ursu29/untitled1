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
        cy.get('.ant-avatar-circle').find('img').should('be.visible').and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        })

        cy.getElement('agile').matchImageSnapshot('agileManagers', {blackout: ['.ant-avatar']})
    })
})