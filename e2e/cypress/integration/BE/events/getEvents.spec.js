import {cancelEvent, createEvent, getEmployee, getEvent} from "../../../support/getData";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {eventData} from "../../../support/client/events";
import {email} from "../../../support/client/employeeData";

const data = {
    titleText: 'holy js',
    end: todaysDate,
    start: pastDay
}

describe('get Events by id (events)', () => {
    let eventId, eventBody, allEventData, employeeId

    before(() => {
        cy.setToken('employee')
        allEventData = eventData(data.titleText, data.end, data.start)

        cy.post(getEmployee(email('employee'))).then(res => {
            const {employeeByEmail} = res.body.data
            employeeId = employeeByEmail.id
        })
        cy.post(createEvent(allEventData)).then(res => {
            eventId = res.body.data.createEvent.id
            expect(eventId.length).to.be.greaterThan(0)

            cy.post(getEvent(eventId)).then(req => eventBody = req.body.data.event)
        })
    })

    after(() => {
        cy.post(cancelEvent(eventId))
            .then(req => expect(eventId).equal(req.body.data.cancelEvent))
    })

    it(`values present in response`, () => {
        Object.keys(allEventData).forEach(el =>{
            typeof allEventData[el] === 'string' ? expect(eventBody[el]).equal(allEventData[el]) : null
        })
    })

    it(`attendees empty array`, () => {
        expect((eventBody.attendees.length)).equal(0)
    })

    it(`who created is present in response`, () => {
        expect((eventBody.createdBy.id)).equal(employeeId)
    })

    it(`id present in response`, () => {
        expect((eventBody.id)).equal(eventId)
    })
})