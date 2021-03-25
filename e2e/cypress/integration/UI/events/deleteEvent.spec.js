import {eventData, eventsEl} from "../../../support/client/events";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {skillEl} from "../../../support/locators";
import {createEvent} from "../../../support/getData";
import {popUp} from "../../../support/client/employeeData";

describe('delete event (events)', () => {
    const title = `title ${todaysDate}`

    before(() => {
        cy.setToken('employee')
        cy.post(createEvent(eventData(title, todaysDate, pastDay))).then(res => {
            const {id} = res.body.data.createEvent
            expect(id.length).to.be.greaterThan(0)
        })

        cy.visit('/calendar')
    })

    it('Delete created event', () => {
        cy.get(eventsEl.event).contains(title).click()
        cy.getElement('delete').click()
        cy.get(popUp.button).contains('Yes').click()
        cy.get('span').contains('OK').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.get(eventsEl.event).contains(title).should('not.exist')
    })
});