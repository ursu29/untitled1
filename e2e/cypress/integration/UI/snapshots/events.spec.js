import {bookPeople} from "../../../fixtures/eventsData";
import {cancelEvent, createEvent} from "../../../support/getData";
import {eventData, eventsEl} from "../../../support/client/events";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";

describe('Visual regression employees page', () => {
    let eventId
    const title = `title ${todaysDate}`

    before(() => {
        cy.setToken('manager')
        cy.post(createEvent(eventData(title, todaysDate, pastDay))).then(res => {
            eventId = res.body.data.createEvent.id
            expect(eventId.length).to.be.greaterThan(0)
        })

        cy.visit('/calendar')
        cy.mockResponse(['getEvent', 'attendees'], bookPeople())

        cy.get(eventsEl.event).contains(title).click()
    })

    after('delete event', () => {
        cy.post(cancelEvent(eventId))
            .then(req => expect(eventId).equal(req.body.data.cancelEvent))
    })

    it(`Should match previous screenshot employees Page`, () => {

        cy.wait(500) //TODO: need to look more clear solution
        cy.get(eventsEl.modal).matchImageSnapshot('eventModal')
    })
});