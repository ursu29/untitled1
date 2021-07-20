import {matrix, notificationsText, skillEl as feedbackEl} from '../../../support/locators'
import {deleteReviewer, getEmployee} from "../../../support/getData";
import {addNewReviewer} from "../../../support/complexLocators";
import {email} from "../../../support/client/employeeData";

describe('add reviewer to SEF (sef)', () => {
    let employeeId, managerData, managerId, employeeEmail

    before(() => {
        cy.setToken('manager')

        cy.post(getEmployee(email('employee'))).then(res => {
            const {employeeByEmail} = res.body.data

            employeeId = employeeByEmail.id
            employeeEmail = employeeByEmail.email
            managerId = employeeByEmail.agileManager.id
            managerData = employeeByEmail.agileManager

            cy.post(deleteReviewer(managerId, employeeId), 'superUser')
        })
    })

    after('delete post', () => {
        cy.post(deleteReviewer(managerId, employeeId), 'superUser')
            .then(req => expect(req.body.data.deleteEvaluationReviewer.id.length)
                .to.be.greaterThan(0))
    })

    it('successfully added new reviewer', () => {
        cy.visit(`/employees/${employeeEmail}/evaluation?tab=evaluation`)
        cy.addRole()

        cy.getResponse(['getEmployees'], 'alias')
        cy.get(addNewReviewer).click()
        cy.getId(feedbackEl.selectSkill).type(managerData.name)
        cy.wait('@alias').then(_ => {
            cy.getId('portal-select').click()
            cy.get('.ant-select-item-option-active').click()

            cy.get(matrix.success).should('be.visible')
            cy.get(matrix.success).should('contain.text', notificationsText.addReviewer)
            cy.get(matrix.success).should('not.exist')
        })
    })
})
