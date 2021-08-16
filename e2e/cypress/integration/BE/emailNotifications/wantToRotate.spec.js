import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";
import {email} from "../../../support/client/employeeData";
import * as getData from "../../../support/getData";
describe('Send notification when employee started rotation process (emails)', () => {
    let employeeData, emailData, firstVacancy

    const message = (name) => ({
        reason: 'Probably, just fore fun',
        recipient: 'HR@syncretis.com',
        name,
        body: `wants to apply for vacancy New position`,
    })
    before(() => {
        cy.setToken('manager')
        cy.getRequestData(EMAIL_URL).then(el => emailData =  el.body.value[0].bodyPreview)
        cy.post(getData.getEmployee(email('employee')))
            .then(res => employeeData  = res.body.data.employeeByEmail)
        cy.post(getData.getVacancies())
            .then(req => firstVacancy = req.body.data.vacancies[0])
    })
    after('cancel rotate',() => {
        cy.post(getData.cancelRotateRequest(firstVacancy.id, employeeData.id )).then(req => {
            const {cancelRotateRequest: {id}} = req.body.data
            expect(id.length).to.be.greaterThan(0)
        })
    })

    it('successfully send rotate Request', () => {
        cy.post(getData.rotateRequest(
            message(employeeData.name).reason,
            firstVacancy.id,
            employeeData.id))
            .then(req => {
                checkNewEmail(emailData, message(employeeData.name), true, message(employeeData.name).recipient)
                const {rotateRequest: {id}} = req.body.data
                expect(id).equal(firstVacancy.id)
            })
    })
});