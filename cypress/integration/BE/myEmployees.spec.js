import { employeeData, email } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { subUser, profileData, employeeProject } from '../../support/client/myEmployees'
import { getEmployee } from '../../support/getData'

describe('Check My Employees', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getMySubordinates'], 'alias')
    cy.visit('/client/profile/employees')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('getMySubordinates response', () => {
    const { id, __typename } = employeeData.employee
    const { profile } = response

    cy.compareObjectsKeys(profile, profileData(id))
    checkKeyValueExist(profile, { id, __typename })
  })
})

describe('Check manager employees', () => {
  let response

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['getMySubordinates'], 'alias')
    cy.visit('/client/profile/employees')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('getMySubordinates response', () => {
    const { id, __typename } = employeeData.employee
    const { subordinateUsers } = response.profile
    const firstUser = subordinateUsers[0]

    cy.compareObjectsKeys(firstUser, subUser)
    checkKeyValueExist(firstUser, { id, __typename })
  })
})

describe('Check manager getEmployeeName', () => {
  let response

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['getEmployeeName'], 'alias')
    cy.visit('/client/profile/employees')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('getEmployeeName response', () => {
    const { id, __typename, name } = employeeData.employee
    const { employeeByEmail } = response

    checkKeyValueExist(employeeByEmail, { id, __typename, name })
  })
})

describe('Check manager GetEmployeeProjects', () => {
  let response
  let managerId

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['GetEmployeeProjects'], 'alias')
    cy.visit('/client/profile/employees')
    cy.post(getEmployee(email('manager'))).then(res => (managerId = res.body.id))
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('GetEmployeeProjects response', () => {
    const firstEnployee = response.employees[0]

    cy.compareObjectsKeys(firstEnployee, employeeProject(managerId))
    checkKeyValueExist(firstEnployee, { managerId })
  })
})
