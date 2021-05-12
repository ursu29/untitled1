import {randomValues} from "../../../support/knowledge/bookmark";
import {devRelFormEl, process, skillEl} from '../../../support/locators'
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";

describe('create new propose (devRel)', () => {
    const {successMes} = skillEl
    const {title, submit, activeData, date} = devRelFormEl

    let emailRecipients = ['Ekaterina.Sogonova@syncretis.com', 'Julia.Korobkina@syncretis.com']
    let lastEmail

    before(() => {
        cy.setToken('manager')
        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)
        cy.visit('/devrel')
    })

    it('successfully create new propose and check email', () => {
        cy.getElement(process.newEvent).click()
        cy.getId(title).type(randomValues.title)
        cy.getId(date).click().type(pastDay).type('{enter}')
        cy.get(activeData).type(todaysDate).type('{enter}')
        cy.getElement(submit).click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')

        checkNewEmail(lastEmail, {...emailRecipients}, true)
    })
})