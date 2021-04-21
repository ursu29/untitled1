import {createPost, deletePost} from "../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";
import {mainCity} from "../../../support/locators";

describe('Send News notification (emails)', () => {
    let createdId, emailData

    const message = {
        text: `some text: ${new Date().getTime()}`,
        recipient: 'Team.Spb@syncretis.com',
        body: 'Find more news at Syncretis Portal'
    }

    before(() => {
        cy.setToken('manager')
        cy.getRequestData(EMAIL_URL).then(el => emailData =  el.body.value[0].bodyPreview)
    })

    after(() => {
        cy.post(deletePost(createdId), 'superUser').then(req => {
            const {deletePost: {id}} = req.body.data

            expect(createdId).equal(id)
        })
    })

    it(`successfully sent News message to ${message.recipient}`, () => {
        cy.post(createPost(message.text, message.text, [mainCity]), 'superUser').then(req => {
            const {createPost: {id}} = req.body.data
            createdId = id

            checkNewEmail(emailData, message)
        })
    })
})
