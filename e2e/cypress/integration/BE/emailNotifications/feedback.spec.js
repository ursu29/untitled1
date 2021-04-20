import {addFeedback, deleteFeedback} from "../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";

describe('Send notification Feedback (emails)', () => {
    let feedbackId, emailData

    const message = {
        text: `Hello, ${new Date().getTime()}`,
        recipient: 'guild-portal@syncretis.com',
        body: 'New feedback about "Portal" with text'
    }

    before(() => {
        cy.setToken('manager')
        cy.get(EMAIL_URL).then(el => emailData =  el.body.value[0].bodyPreview)
        cy.setToken('employee')
        cy.post(addFeedback(message.text))
            .then(req => feedbackId = req.body.data.addFeedback.id)
    })

    after(() => {
        cy.post(deleteFeedback(feedbackId)).then(req => {
            expect(req.body.data.deleteFeedback.id).equal(feedbackId)
        })
    })

    it(`successfully sent Feedback message to ${message.recipient}`, () => {
        cy.setToken('manager')
        checkNewEmail(emailData, message)
    })
});
