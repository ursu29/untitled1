import {getEmployee, getProjects, updateEmployeeCapacity} from "../../../support/getData";
import {tomorrow} from "../../../support/officePlanner/officeDays";
import {createCapacityObj} from "../../../support/client/cv";

describe('Check capacity data (capacity)', () => {

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

    })

    after(() => {
        const { id, agileManager } = employeeData
        const { employeeProjects } = projects
        const newObj = []

        employeeProjects.forEach(el =>
            newObj.push(createCapacityObj(0, el.id, false)))

        cy.post(updateEmployeeCapacity(
            id,
            agileManager.id,
            newObj), 'superUser')
    })

    it('updateEmployee, change capacity', () => {
        const { id, agileManager } = employeeData
        const { employeeProjects } = projects
        const newObj = []

        employeeProjects.forEach(el =>
            newObj.push(createCapacityObj(+tomorrow, el.id, true)))

        cy.post(updateEmployeeCapacity(id, agileManager.id, newObj), 'superUser').then(req => {
            expect(req.body.data.updateEmployee.id).equal(employeeData.id)

            cy.post(getProjects(employeeData.id)).then(req => {
                const {employeeProjects} = req.body.data.employee

                ;employeeProjects.forEach(el => {
                    expect(el.capacity).equal(+tomorrow)
                    expect(el.isExtraCapacity).equal(true)
                })
            })
        })
    })
})