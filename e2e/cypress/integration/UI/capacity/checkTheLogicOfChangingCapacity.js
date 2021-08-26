import {getEmployee, getProjects, updateEmployeeCapacity} from "../../../support/getData";
import {createCapacityObj} from "../../../support/client/cv";
import { clickElement } from '../../../support/mainCommands'

describe('check the Logic of changing Capacity an Employee', () => {
  const testEmail = 'alexey.avdeev@syncretis.com'
  let employeeData, projects
  const capacity = [100, 0, 0, 0]

  before(() => {
    cy.setToken('manager')

    cy.post(getEmployee(testEmail)).then(res => {
      employeeData = res.body.data.employeeByEmail

      cy.post(getProjects(employeeData.id))
        .then(res => projects = res.body.data.employee)
    })

    cy.visit(`/employees/${testEmail}`)
    cy.addRole()
  })

  after(() => {
    const { id, agileManager } = employeeData
    const { employeeProjects } = projects
    const newObj = []

    newObj.push(createCapacityObj(0, employeeProjects[0].id, false))

    cy.post(updateEmployeeCapacity(id, agileManager.id, newObj), 'superUser')

    cy.post(getProjects(employeeData.id)).then(res => {
      const { employeeProjects } = res.body.data.employee
      expect(employeeProjects[0].capacity).equal(0)
    })
  })

  it('check Make project main button', () => {

    const { id, agileManager } = employeeData
    const { employeeProjects } = projects
    const newObj = []

    employeeProjects.forEach(el =>
      newObj.push(createCapacityObj(15, el.id, false)))

      cy.post(updateEmployeeCapacity(id, agileManager.id, newObj), 'superUser')

    cy.getIcon('edit').click()
    cy.getElement('capacityValue').should('value','15%')

    cy.getElement('capacity')
    clickElement('Make project main')
    clickElement('Yes')
    cy.getElement('save').click()

    cy.post(getProjects(employeeData.id)).then(res => {

      const { employeeProjects } = res.body.data.employee

      employeeProjects.forEach((el, idx) =>
        expect(el.capacity).equal(capacity[idx]))
    })
  })
})