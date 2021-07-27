import {getEmployee, getProjects, updateEmployeeCapacity} from "../../../support/getData";
import {postEl, skillEl} from "../../../support/locators";
import {createCapacityObj} from "../../../support/client/cv";

describe('add capacity to employee (capacity)', () => {
    const testEmail = 'alexey.avdeev@syncretis.com'
    let employeeData
    let projects

    before(() => {
        cy.setToken('manager')

        cy.post(getEmployee(testEmail)).then(res => {
            employeeData = res.body.data.employeeByEmail

            cy.post(getProjects(employeeData.id))
                .then(req => projects = req.body.data.employee)
        })

        cy.visit(`/employees/${testEmail}`)
        cy.addRole()
    })

    after(() => {
        const { id, agileManager } = employeeData
        const { employeeProjects } = projects
        const newObj = []

        employeeProjects.forEach(el =>
            newObj.push(createCapacityObj(0, el.id, false)))

        cy.post(updateEmployeeCapacity(id, agileManager.id, newObj), 'superUser').then(res => {
            expect(res.body.data.updateEmployee.id).equal(employeeData.id)
        })
    })

    it('change capacity', () => {
        cy.getIcon('edit').click()
        ;['20', '60', '20']
            .forEach((el,idx) =>  cy.get('.ant-input-number-input')
                .eq(idx)
                .clear()
                .type(el))

        cy.get('span').contains('extra').first().click()
        cy.getElement('save').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')
        cy.get(postEl.mainTag).contains('20% !').should('be.visible')
    })
});