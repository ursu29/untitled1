import {devRelFormEl, process, skillEl} from "../../../support/locators";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";
import {getEmployee} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {randomValues} from "../../../support/knowledge/bookmark";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";

const message = (employeeEmail) => ({
    firstEmail:'Ekaterina.Sogonova@syncretis.com',
    secondEmail: 'Julia.Korobkina@syncretis.com',
    title: `Employee ${employeeEmail} has requested for participation on the event.`
})

describe('participate to event (devRel)', () => {
    const {successMes} = skillEl
    const {title, link, submit, activeData, date} = devRelFormEl
    let lastEmail, employeeData

    before(() => {
        cy.setToken('manager')
        cy.post(getEmployee(email('manager'))).then(res => employeeData = res.body.data.employeeByEmail)
        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)

        cy.visit('/devrel')
    })

    beforeEach(() => {
        cy.addHeadersAuth()
    })
    afterEach(() => {
        cy.addHeadersAuth()
    })

    after(() => {
        cy.getIcon('delete').last().click()
        cy.get('span').contains('Yes').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')
    })

    it('successfully create new propose', () => {
        cy.getElement(process.create).click()
        cy.getId(title).type(randomValues.title)
        cy.getId(date).click().type(pastDay).type('{enter}')
        cy.get(activeData).type(todaysDate).type('{enter}')
        cy.getId(link).type(randomValues.link)
        cy.getElement(submit).click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')
    })

    it('participate to event and send message', () => {
        cy.getElement(process.participate).last().click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')

        checkNewEmail(lastEmail, message(employeeData.email), true)
    })
})