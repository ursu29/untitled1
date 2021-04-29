import {eventData, eventsEl} from "../../../support/client/events";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {matrix, skillEl} from "../../../support/locators";
import {cancelEvent} from "../../../support/getData";

describe('Create new event (events)', () => {
    let eventId, allEventData
    const today = new Date().getDate()
    const testDates = ['10', '11']
    const title = `title ${today}`

    before(() => {
        cy.setToken('employee')
        allEventData = eventData(title, todaysDate, pastDay)

        cy.visit('/calendar')
    })

   after('delete event', () => {
        cy.post(cancelEvent(eventId))
            .then(req => expect(eventId).equal(req.body.data.cancelEvent))
    })

    it('Create new event', () => {
        cy.getElement('addEvent').click()

       ;['title','city','location', 'description', 'link'].forEach(el => {
            if(el === 'city') {
                cy.getId(el).type('sank')
                cy.get(matrix.item).eq(0).click()

                return
            }
            cy.getId(el).type(allEventData[el])

        })

        cy.getId('date').click()
        testDates.forEach(el => {
            cy.get('td').contains(el).click()
            cy.get('button').contains('Ok').click()
        })
        cy.get(skillEl.skillsEvent).click()
        cy.get('span').contains('Agile').click()

        cy.getResponse(['createEvent'], 'alias')
        cy.getElement('create').click({force: true})

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.wait(`@alias`)
            .then(req => eventId = req.response.body.data.createEvent.id)

        cy.get(eventsEl.event).contains(title).should('be.visible')
    })
});