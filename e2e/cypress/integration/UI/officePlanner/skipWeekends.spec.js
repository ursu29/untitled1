import {table, spinner, workspace} from '../../../support/locators'
import {nextWeek} from "../../../support/officePlanner/officeDays";

describe('book range days and skip weekends (office-planner)', () => {
    const {data, activePicker, numberOfPeople} = workspace
    let secondToLastText, lastText

    before(() => {
        cy.setToken('employee')
        cy.visit('/office-planner')

        cy.getElement(numberOfPeople).eq(5).then(el =>  secondToLastText = el.text())
        cy.getElement(numberOfPeople).eq(6).then(el => lastText = el.text())
    })

    it('skip weekends', () => {
        cy.getElement(table.range).click()
        cy.get(data).last().click()
        nextWeek.split('').forEach(_ => cy.get(activePicker).type('{backspace}'))
        cy.get(activePicker).type(nextWeek)
        cy.get('span').contains('OK').click({force: true})

        cy.get(spinner.active).should('be.visible')
        cy.get(spinner.active).should('not.exist')

        cy.getElement(numberOfPeople).eq(5).then(el =>  expect(secondToLastText).equal(el.text()))
        cy.getElement(numberOfPeople).eq(6).then(el =>  expect(lastText).equal(el.text()))
    })
})
