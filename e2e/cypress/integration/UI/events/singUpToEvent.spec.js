import {eventData, eventsEl} from "../../../support/client/events";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {skillEl} from "../../../support/locators";
import {cancelEvent, createEvent} from "../../../support/getData";

describe('sign up to event (events)', () => {
    let eventId
    const title = `title ${todaysDate}`

    before(() => {
        cy.setToken('employee')
        cy.post(createEvent(eventData(title, todaysDate, pastDay))).then(res => {
            eventId = res.body.data.createEvent.id
            expect(eventId.length).to.be.greaterThan(0)
        })

        cy.visit('/calendar')
    })

    after('delete event', () => {
        cy.post(cancelEvent(eventId))
            .then(req => expect(eventId).equal(req.body.data.cancelEvent))
    })

    it('sign up to event', () => {
        cy.get(eventsEl.event).contains(title).click()
        cy.getElement(eventsEl.signUp).click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.getElement(eventsEl.count).should('have.text', 0)
        cy.getElement(eventsEl.user).should('not.exist')
    })
});