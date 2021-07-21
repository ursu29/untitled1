import {todaysDate} from "../../../support/officePlanner/officeDays";
import {skillEl, matrix} from "../../../support/locators";

describe('Create matrix and add new grade', () => {
    const {createMatrix, title, description, submit} = matrix
    const {successMes} = skillEl
    const gradeName = `grade: ${todaysDate}`

    before(() => {
        cy.setToken('manager')
        cy.visit('/matrices/605337b1bb9bcd001d220063/')
        cy.addRole()
    })

    it('add grade to matrix', () => {
        cy.getElement(createMatrix).eq(0).click()
        cy.getElement(title).type(gradeName)
        cy.getElement(description).type(`description: ${todaysDate}`)
        cy.getElement(submit).click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')
        cy.get('div').contains(gradeName).should('be.visible')
    })
})