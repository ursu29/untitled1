import {EMAIL_URL} from "../../../../support/emails/checkNewEmails";
import {email} from "../../../../support/client/employeeData";
import * as getData from "../../../../support/getData";
import {allData, checkRotationEmail} from "../../../../support/emails/checkRotateEmails";


describe('Send notification to Employee when employee started rotation process (emails)', () => {
    let employeeData, lastEmail, firstVacancy

    const reasonText = new Date().getTime()

    before(() => {
        cy.setToken('manager')
        cy.get(EMAIL_URL).then(el => lastEmail =  el.body.value[0].bodyPreview)
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
            `reason: ${reasonText}`,
            firstVacancy.id,
            employeeData.id))
            .then(req => {
                const {rotateRequest: {id}} = req.body.data

                expect(id).equal(firstVacancy.id)
            })
    })

    it(`successfully sent message to Employee`, () => {
        const vacancyData = {firstVacancy, lastEmail, reasonText}

        cy.setToken('manager')
        checkRotationEmail(allData(employeeData, vacancyData, false))
    })
});