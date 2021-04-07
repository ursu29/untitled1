import {getEmployee, updateOneTwoOne} from "../../../support/getData";
import {email, oneTwoOne, popUp} from "../../../support/client/employeeData";
import {matrix} from "../../../support/locators";
import {oneTwoOneLocators} from "../../../support/client/oneTwoOne";

describe('Close oneTwoOne meeting (oneTwoOne)', () => {
    let employeeId

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => {
            employeeId = res.body.data.employeeByEmail.id

            cy.post(updateOneTwoOne(employeeId, true), 'superUser').then(req => {
                expect(req.body.data.updateEmployee.id).equal(employeeId)
            })
        })
    })

    it('To accept a new meeting', () => {
        cy.setToken('manager')
        cy.setImgToken('manager')
        cy.visit('/profile/employees')

        cy.get(oneTwoOneLocators.closeOneTwoOne).eq(0).click()
        cy.get(popUp.title).should('contain.text', oneTwoOne.closeTitle)
        cy.get(popUp.button).contains('Yes').click()

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('contain.text', 'Updated')
        cy.get(matrix.success).should('not.exist')
        cy.get(oneTwoOne.disableBtn).should('not.exist')
    })
})