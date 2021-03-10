import {pastDay, todaysDate} from "../../support/officePlanner/officeDays";
import {devMenu, feedbackEl, menuEl, skillEl} from "../../support/locators";

describe('add new feedback', () => {
    const items =  ['Syncretis', 'Team', 'Event', 'Portal']
    const feedback = `${todaysDate}${pastDay}`
    const {about, project, response, send} = feedbackEl

    before(() => {
        cy.setToken('employee')
        cy.visit('/feedback')
    })

    it('check default form fields', () => {
        items.forEach(text => {
            cy.getElement(about).click()
            cy.get(devMenu.item).contains(text).click()

            cy.getElement(about).should('contain.text', text)
            if(text === 'Team') {
                cy.getElement(project).should('be.visible')

                return
            }
            cy.getElement(project).should('not.be.visible')

        })
    })

    it('send default feedback', () => {
        const firstItem = items[0]

        cy.getElement(about).click()
        cy.get(devMenu.item).contains(firstItem).click()

        cy.getElement(response).type(feedback)
        cy.getElement(send).click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.be.visible')
        cy.get(menuEl.title).contains(feedback).should('be.exist')
    })
})