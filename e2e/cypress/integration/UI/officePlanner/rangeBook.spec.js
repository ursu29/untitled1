import {table, spinner, postEl} from '../../../support/locators'

describe('Office planner book range days (office-planner)', () => {
    const todayToggle = `${table.activeTab} > ${postEl.buttonSwitch}`
    let text

    before(() => {
        cy.setToken('employee')
        cy.visit('/office-planner')

        cy.getElement(table.range).click()
        ;['Cancel', 'OK'].forEach(el => cy.clickElement(el))

        cy.get(spinner.active).should('be.visible')
        cy.get(spinner.active).should('not.exist')

        cy.getElement('count').then(el => text = el.text())
    })

    after(() => {
        cy.get(todayToggle).click()
    })

    it('book two days', () => {
        cy.getElement(table.range).click()
        ;['Create', 'OK'].forEach(el => cy.clickElement(el))

        cy.get(spinner.active).should('be.visible')
        cy.get(spinner.active).should('not.exist')
        cy.getElement('count').then(el => expect(el.text()).not.equal(text))
    })
})
