import {cancelEvent, createEvent} from "../../../support/getData";
import {eventData} from "../../../support/client/events";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";

describe('create new event (events)', () => {
    const title = 'holy js'
    let eventId

    before(() => {
        cy.setToken('employee')
    })

    after('delete event', () => {
        cy.post(cancelEvent(eventId))
            .then(req => expect(eventId).equal(req.body.data.cancelEvent))
    })

    it('successfully created an event', () => {
        cy.post(createEvent(eventData(title, todaysDate, pastDay))).then(res => {
            eventId = res.body.data.createEvent.id
            expect(eventId.length).to.be.greaterThan(0)
        })
    })
});