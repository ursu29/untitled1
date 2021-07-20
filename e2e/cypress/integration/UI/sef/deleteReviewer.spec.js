import {matrix, notificationsText} from '../../../support/locators'
import {createEvaluationReviewer, getEmployee} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";

describe('delete reviewer from SEF (sef)', () => {
    let employeeData

    before(() => {
        cy.setToken('manager')

        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail
            cy.post(createEvaluationReviewer(employeeData.id, employeeData.agileManager.id), 'superUser')
        })
    })

    it('successfully delete reviewer', () => {
        cy.visit(`/employees/${employeeData.email}/evaluation?tab=evaluation`)
        cy.addRole()

        cy.get('div').contains('delete').click()

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('contain.text', notificationsText.deleteReviewer)
        cy.get(matrix.success).should('not.exist')
    })
})
