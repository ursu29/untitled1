import {
    cancelOnboardingTicket,
    createTraining, deleteTraining,
    getEmployee,
} from "../../../support/getData";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";
import {email} from "../../../support/client/employeeData";

describe('Send notification when cancel the training (emails)', () => {
    let ticketId, emailData, employeeData
    const trainingName  = `test training name: ${new Date().getTime()}`

    const message = (email, name) => ({
        text: 'Open at Syncretis Portal',
        recipient: email,
        body: `Employee ${email} canceled an appointment for your training: "${name}".`,
    })

    before(() => {
        cy.setToken('manager')

        cy.getRequestData(EMAIL_URL).then(el => emailData =  el.body.value[0].bodyPreview)
        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail

            cy.post(createTraining(trainingName, 'description', employeeData.id, true), 'superUser')
                .then(res => ticketId = res.body.data.createOnboardingTicket.id)
        })
    })

    after(() => {
        cy.post(deleteTraining(ticketId), 'superUser').then(req => {
            expect(req.body.data.deleteOnboardingTicket.id).equal(ticketId)
        })
    })

    it('cancel the training', () => {
        cy.setToken('employee')
        cy.post(cancelOnboardingTicket(ticketId))
            .then(req => expect(req.body.data.cancelOnboardingTicket).equal(ticketId))
    })

    it(`successfully sent message to manager`, () => {
        cy.setToken('manager')
        checkNewEmail(emailData, message(employeeData.email, trainingName))
    })
});
