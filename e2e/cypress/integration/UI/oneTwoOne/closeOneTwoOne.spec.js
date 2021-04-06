import {getEmployee, updateOneTwoOne} from "../../../support/getData";
import {email, oneTwoOne, popUp} from "../../../support/client/employeeData";
import {matrix} from "../../../support/locators";
import {oneTwoOneLocators} from "../../../support/client/oneTwoOne";

describe('Close oneTwoOne meeting (oneTwoOne)', () => {
    let employeeData

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => {
            employeeData = res.body.data.employeeByEmail
            cy.post(updateOneTwoOne(employeeData.agileManager.id, true))
        })
    })

    after(() => {
        cy.setToken('manager')
        cy.post(updateOneTwoOne(employeeData.id, false), 'superUser')
    })
    it('To accept a new meeting', () => {
        cy.setToken('manager')
        cy.setImgToken('manager')
        cy.visit('/employees')

        cy.get(oneTwoOneLocators.closeOneTwoOne).eq(0).click()
        cy.get(popUp.title).should('contain.text', oneTwoOne.closeTitle)
        cy.get(popUp.button).contains('Yes').click()

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('not.exist')
        cy.get(oneTwoOne.disableBtn).should('not.exist')
    })
})