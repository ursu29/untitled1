import {
    getEmployee, matricesCustomFields,
    matricesCustomFieldsMutation,
} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {pastDay} from "../../../support/officePlanner/officeDays";

describe('update last discussed', () => {
    let employeeData

    before(() => {
        cy.setToken('employee')
        cy.post(getEmployee(email('employee')))
            .then(res => employeeData = res.body.data.employeeByEmail)
    })

    it('check date after updated matrices', () => {
        cy.post(matricesCustomFieldsMutation(employeeData.id, pastDay)).then(_ => {
            cy.post(matricesCustomFields(employeeData.email)).then(req => {
                const {matricesCustomFields: {lastDiscussed}} = req.body.data

                expect(lastDiscussed).to.equal(pastDay)
            })
        })
    })
})