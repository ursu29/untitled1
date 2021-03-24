import {todaysDate} from "../../../support/officePlanner/officeDays";
import {matrix, skillEl} from "../../../support/locators";

describe('Crete new group', () => {
    const {successMes} = skillEl
    const {createMatrix, title, description, submit} = matrix
    const groupName = `group: ${todaysDate}`

    before(() => {

        cy.setToken('manager')
        cy.visit('/matrices/605337b1bb9bcd001d220063/')
        cy.addRole()
    })

    it('add group to matrix', () => {
        cy.getElement(createMatrix).eq(1).click()
        cy.getElement(title).type(groupName)
        cy.getElement(description).type(`description: ${todaysDate}`)
        cy.getElement(submit).click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')
        cy.get('div').contains(groupName).should('be.visible')
    })
})