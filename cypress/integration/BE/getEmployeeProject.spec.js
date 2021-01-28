import {employeeData} from "../../support/client/employeeData";
import {checkKeyValueExist} from "../../support/complexLocators";

xdescribe('Check GetEmployeeProjects', () => {

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('manager')
    })

    it('GetEmployeeProjects response', () => {
        const { id, __typename } = employeeData.employee

        cy.getResponse(['GetEmployeeProjects'], 'alias')
        cy.visit('/profile')

        cy.wait('@alias').then(req => {
            const { data } = req.response.body
            const firstEmployee = data.employees[0]

            expect(firstEmployee.leadingProjects).to.be.a('array')
            expect(firstEmployee.projects).to.be.a('array')
            checkKeyValueExist(firstEmployee, { id, __typename })
        })
    })
})
