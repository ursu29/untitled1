import {pastDay, todaysDate} from "../../support/officePlanner/officeDays";
import {devMenu, feedbackEl, menuEl, skillEl} from "../../support/locators";
import {deleteFeedback} from "../../support/getData";

describe('add new feedback', () => {
    const items =  ['Syncretis', 'Team', 'Event', 'Portal']
    const feedback = `${todaysDate}${pastDay}`
    const {about, project, response, send} = feedbackEl

    before(() => {
        cy.setToken('employee')
        cy.visit('/feedback')
    })

    beforeEach(() => {
        cy.addHeadersAuth()
    })

    items.forEach(text => {
        it(`check default form fields ${text}`, () => {
            cy.getElement(about).click()
            cy.get(devMenu.item).contains(text).click()

            cy.getElement(about).should('contain.text', text)
            if (text === 'Team') {
                cy.getElement(project).should('be.visible')

                return
            }
            cy.getElement(project).should('not.exist')
        })
    })

    it('send default feedback', () => {
        const firstItem = items[0]

        cy.getElement(about).click()
        cy.get(devMenu.item).contains(firstItem).click()

        cy.getElement(response).type(feedback)

        cy.getResponse(['addFeedback'], 'alias')
        cy.getElement(send).click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')
        cy.get(menuEl.title).contains(feedback).should('be.exist')

        cy.wait(`@alias`).then(val => {
            const  {addFeedback: {id}} = val.response.body.data

            cy.post(deleteFeedback(id))
                .then(req => expect(req.body.data.deleteFeedback.id.length).to.be.greaterThan(0))
        })
    })
})