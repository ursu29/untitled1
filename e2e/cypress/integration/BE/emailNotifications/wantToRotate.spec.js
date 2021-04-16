import * as Cypress_ from "rxjs/operators";
import {checkNewEmail, EMAIL_URL} from "../../../support/emails/checkNewEmails";
import {email} from "../../../support/client/employeeData";
import * as getData from "../../../support/getData";
describe('Send notification when employee started rotation process (emails)', () => {
    let employeeData, allMessages, firstVacancy

    const message = (name) => ({
        reason: 'Probably, just fore fun',
        recipient: 'HR@syncretis.com',
        body: `Candidate ${name} wants to apply for vacancy New position`,
    })
    before(() => {
        cy.setToken('manager')
        cy.get(EMAIL_URL).then(el => allMessages =  el.body.value.length)
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
        cy.setToken('employee')
        cy.post(getData.rotateRequest(
            message(employeeData.name).reason,
            firstVacancy.id,
            employeeData.id))
            .then(req => {
                const {rotateRequest: {id}} = req.body.data

                expect(id).equal(firstVacancy.id)
            })
    })

    it(`successfully sent message to manager`, () => {
        cy.setToken('manager')
        Cypress_.debounce(checkNewEmail(allMessages, message(employeeData.name)), 300)
    })
});