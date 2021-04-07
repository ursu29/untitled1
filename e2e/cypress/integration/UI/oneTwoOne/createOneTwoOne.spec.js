import {getEmployee, updateOneTwoOne} from "../../../support/getData";
import {email, oneTwoOne, popUp} from "../../../support/client/employeeData";
import {matrix} from "../../../support/locators";

describe('Create new oneTwoOne (oneTwoOne)', () => {
    let employeeId

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')
        cy.post(getEmployee(email('employee'))).then(res => employeeId = res.body.data.employeeByEmail.id)
    })

    after(() => {
        cy.post(updateOneTwoOne(employeeId, false), 'superUser').then(req => {
            expect(req.body.data.updateEmployee.id).equal(employeeId)
        })
    })
    it('create a new meeting', () => {

        cy.visit('/')
        cy.getElement(oneTwoOne.button).click()

        cy.get(popUp.title).should('contain.text', oneTwoOne.text)
        cy.get(popUp.button).contains('Yes').click()

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('contain.text', 'Updated')
        cy.get(matrix.success).should('not.exist')
        cy.get(oneTwoOne.disableBtn).should('exist')
    })
})