import {pastDay, todaysDate} from "../../support/officePlanner/officeDays";
import {skillEl} from "../../support/locators";

describe('add new feedback', () => {
    const items =  ['Syncretis', 'Team', 'Event', 'Portal']
    const feedback = `${todaysDate}${pastDay}`

    before(() => {
        cy.setToken('employee')
        cy.visit('/feedback')
    })

    it('check default form fields', () => {
        items.forEach(text => {
            cy.getElement('about').click()
            cy.get('.ant-select-item').contains(text).click()

            cy.getElement('about').should('contain.text', text)
            if(text === 'Team') {
                cy.getElement('project').should('be.visible')

                return
            }
            cy.getElement('project').should('not.be.visible')

        })
    })

    it('send default feedback', () => {
        const firstItem = items[0]

        cy.getElement('about').click()
        cy.get('.ant-select-item').contains(firstItem).click()

        cy.getElement('feedback').type(feedback)
        cy.getElement('post').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.be.visible')
        cy.get('.ant-typography').contains(feedback).should('be.exist')
    })
})