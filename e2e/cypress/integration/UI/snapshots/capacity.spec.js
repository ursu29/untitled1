import {capacity} from "../../../fixtures/capacity";
import {getEmployee} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";

describe('Visual regression "Capacity" (capacity)', () => {
    const user = 'employee'
    let userId

    before(() => {
        cy.setToken(user)
        cy.post(getEmployee(email('employee')))
            .then(res => userId = res.body.data.employeeByEmail.id)
    })

    it('Should match previous screenshot', () => {
        cy.mockResponse(['getEmployeeProjects'], capacity(userId))
        cy.visit('/profile')

        cy.get('.ant-skeleton').should('be.visible')
        cy.get('.ant-skeleton').should('not.exist')
        cy.snapshot('data-cy', 'project', 'projectCapacity')
        //cy.getElement('project').matchImageSnapshot('projectCapacity')
    })
})