import {matrix, notificationsText, skillEl as feedbackEl} from '../../../support/locators'
import {deleteReviewer, getEmployee} from "../../../support/getData";
import {addNewReviewer} from "../../../support/complexLocators";
import {email} from "../../../support/client/employeeData";

describe('add reviewer to SEF by yourself (sef)', () => {
    let employeeData

    before(() => {
        cy.setToken('manager')
        cy.setImgToken('manager')

        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail

            cy.post(deleteReviewer(employeeData.agileManager.id, employeeData.id), 'superUser')
        })
    })

    it('cannot to add reviewer', () => {
        cy.visit('profile/evaluation')
        cy.addRole()

        cy.getResponse(['getEmployees'], 'alias')
        cy.get(addNewReviewer).click()
        cy.getId(feedbackEl.selectSkill).type(employeeData.name)
        cy.wait('@alias').then(_ => {
            cy.getId('portal-select').click()
            cy.get('.ant-select-item-option-active').click()

            cy.get(matrix.error).should('be.visible')
            cy.get(matrix.error).should('contain.text', notificationsText.errorSef)
            cy.get(matrix.error).should('not.exist')
        })
    })
})
