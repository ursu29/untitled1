import {randomValues} from "../../../support/knowledge/bookmark";
import {devRelFormEl, skillEl} from '../../../support/locators'
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";

describe('create new article (devRel)', () => {
    const {successMes} = skillEl
    const {title, link, submit, article, resource} = devRelFormEl

    let emailRecipients = ['Ekaterina.Sogonova@syncretis.com', 'Julia.Korobkina@syncretis.com']
    let lastEmail

    before(() => {
        cy.setToken('manager')
        cy.getRequestData(EMAIL_URL).then(el => lastEmail = el.body.value[0].bodyPreview)

        cy.visit('/devrel')
    })

    it('successfully create new propose and check email', () => {
        cy.getElement('articles').click()

        cy.getElement(article).click()
        cy.getId(resource).type(randomValues.title)
        cy.getId(title).type(new Date().getTime().toString())
        cy.getId(link).type(randomValues.link)
        cy.getElement(submit).click()

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')

        checkNewEmail(lastEmail, {...emailRecipients}, true)
    })
})