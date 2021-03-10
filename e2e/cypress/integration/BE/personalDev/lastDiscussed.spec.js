import {
    getDevelopmentPlans,
    getEmployee,
    updateDevelopmentPlan
} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";

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

    it('check date after updated dev plans', () => {
        cy.post(updateDevelopmentPlan(devPlanId, todaysDate, pastDay)).then(_ => {
            cy.post(getDevelopmentPlans(employeeData.id)).then(req => {
                const {developmentPlans: {lastDiscussed}} = req.body.data

                expect(lastDiscussed).to.contains(todaysDate)
            })
        })
    })
})