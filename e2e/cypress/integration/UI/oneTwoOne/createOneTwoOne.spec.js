import {getEmployee, updateOneTwoOne} from "../../../support/getData";
import {email, oneTwoOne, popUp} from "../../../support/client/employeeData";
import {matrix} from "../../../support/locators";

describe('Create new oneTwoOne (oneTwoOne)', () => {
    let employeeData

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
    })

    after(() => {
        cy.setToken('manager')
        cy.post(updateOneTwoOne(employeeData, false), 'superUser')
    })
    it('create a new meeting', () => {
        cy.visit('/')
        cy.getElement(oneTwoOne.button).click()

        cy.get(popUp.title).should('contain.text', oneTwoOne.text)
        cy.get(popUp.button).contains('Yes').click()

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('not.exist')
        cy.get(oneTwoOne.disableBtn).should('not.exist')
    })
})