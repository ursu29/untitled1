import { employeeData, email } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { subUser } from '../../support/client/myEmployees'
import { getEmployee } from '../../support/getData'

describe('Check manager employees', () => {
  let response
  let managerId

  before(() => {
    cy.setToken('manager')
    cy.post(getEmployee(email('employee'))).then(res => (managerId = res.body.id))
    cy.getResponse(['getSubordinates'], 'alias')
    cy.visit('/client/profile/employees')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('getSubordinates response', () => {
    const { __typename, id, name, position, email } = employeeData.employee
    const { employeeByEmail } = response
    const { subordinateUsers } = employeeByEmail

    cy.compareObjectsKeys(subordinateUsers[0], subUser)
    checkKeyValueExist(employeeByEmail, { managerId, __typename })
    checkKeyValueExist(subordinateUsers[0], { __typename, id, name, position, email })
  })
})

describe('Check manager getEmployee', () => {
  let response

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['getEmployeeName'], 'alias')
    cy.visit('/client/profile/employees')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('getEmployeeName response', () => {
    const { id, __typename, name } = employeeData.employee
    const { employeeByEmail } = response

    checkKeyValueExist(employeeByEmail, { __typename, id, name })
  })
})
