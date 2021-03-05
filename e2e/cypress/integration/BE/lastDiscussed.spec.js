import {
    getDevelopmentPlans,
    getEmployee, matricesCustomFields,
    matricesCustomFieldsMutation,
    updateDevelopmentPlan
} from "../../support/getData";
import {email} from "../../support/client/employeeData";
import {pastDay, todaysDate} from "../../support/officePlanner/officeDays";

describe('update last discussed', () => {
    let employeeData
    let devPlanId

    before(() => {
        cy.setToken('employee')
        cy.post(getEmployee(email('employee')))
            .then(res => {
                employeeData = res.body.data.employeeByEmail

                cy.post(getDevelopmentPlans(employeeData.id))
                    .then(req => devPlanId = req.body.data.developmentPlans.id)
            })
    })

    it('update personal dev date', () => {
        cy.post(updateDevelopmentPlan(devPlanId, todaysDate, pastDay)).then(req => {
            const {id} = req.body.data.updateDevelopmentPlan

            expect(id.length).be.greaterThan(0)
        })
    })

    it('check date after updated dev plans', () => {
        cy.post(updateDevelopmentPlan(devPlanId, todaysDate, pastDay)).then(_ => {
            cy.post(getDevelopmentPlans(employeeData.id)).then(req => {
                const {developmentPlans: {lastDiscussed}} = req.body.data

                expect(lastDiscussed).to.contains(todaysDate)
            })
        })
    })

    it('update matrix last discussed', () => {
        cy.post(matricesCustomFieldsMutation(employeeData.id, pastDay)).then(req => {
            const {id} = req.body.data.updateMatricesCustomFields

            expect(id.length).be.greaterThan(0)
        })
    })

    it('check date after updated matrices', () => {
        cy.post(matricesCustomFieldsMutation(employeeData.id, pastDay)).then(_ => {
            cy.post(matricesCustomFields(employeeData.email)).then(req => {
                debugger
                const {matricesCustomFields: {lastDiscussed}} = req.body.data

                expect(lastDiscussed).to.equal(pastDay)
            })
        })
    })
})