import { getEmployee } from '../../../support/getData'
import { email } from '../../../support/client/employeeData'
import { officeEmployee } from '../../../support/officePlanner/officeDays'
import { checkKeyValueExist } from '../../../support/complexLocators'

describe('Check Employees response', () => {
  let response
  let employeeData

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)

    cy.getResponse(['getEmployees'], 'alias')
    cy.visit('/office-planner')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('Check Employees response', () => {
    const { employees, officeAccess, profile } = response
    const { id, location, __typename } = employeeData
    const firstEmployee = employees[0]

    expect(employees).to.be.a('array')

    cy.compareObjectsKeys(officeEmployee, firstEmployee)
    checkKeyValueExist({ read: true, write: false, __typename: 'Access' }, officeAccess)
    checkKeyValueExist({ id, location, __typename }, profile)
  })
})