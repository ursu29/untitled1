import {getEmployee, getProjects, updateEmployeeCapacity} from "../../../support/getData";
import {createCapacityObj} from "../../../support/client/cv";
import { clickElement } from '../../../support/mainCommands'

describe('check the Logic of changing Capacity an Employee', () => {
  const testEmail = 'alexey.avdeev@syncretis.com'
  let employeeData, projects

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

  it('check Make project main button', () => {

    const { id, agileManager } = employeeData
    const { employeeProjects } = projects
    const newObj = []

    employeeProjects.forEach(el =>
      newObj.push(createCapacityObj(15, el.id, false)))

      cy.post(updateEmployeeCapacity(id, agileManager.id, newObj), 'superUser').then(res => {
        expect(res.body.data.updateEmployee.id).equal(employeeData.id)
      })

    cy.getIcon('edit').click()
    cy.getElement('capacityValue').should('value','15%')

    cy.getElement('capacity')
    clickElement('Make project main')
    clickElement('Yes')
    cy.getElement('save').click()

    cy.post(getProjects(employeeData.id)).then(res => {

      const { employeeProjects } = res.body.data.employee

      employeeProjects.forEach(el => {
        expect(el.capacity).to.be.oneOf( [0, 100])
      })
    })
  })
});