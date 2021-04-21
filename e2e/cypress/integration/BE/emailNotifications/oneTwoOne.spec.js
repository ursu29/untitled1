import {getEmployee, updateOneTwoOne} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";

describe('Send notification OneTwoOne (emails)', () => {
    let employeeId, emailData

    const text = {
        recipient: 'test.manager@syncretis.com',
        body: 'Test Employee has requested one-2-one with you.'
    }

    before(() => {
        cy.setToken('manager')
        cy.get(EMAIL_URL).then(el => emailData =  el.body.value[0].bodyPreview)

        cy.setToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => {
            employeeId = res.body.data.employeeByEmail.id

            cy.post(updateOneTwoOne(employeeId, true)).then(req => {
                expect(req.body.data.updateEmployee.id).equal(employeeId)
            })
        })
    })

    after(() => {
        cy.post(updateOneTwoOne(employeeId, false)).then(req => {
            expect(req.body.data.updateEmployee.id).equal(employeeId)
        })
    })

    it('successfully sent OneTwoOne message to Manager', () => {
        cy.setToken('manager')
        checkNewEmail(emailData, text)
    })

});