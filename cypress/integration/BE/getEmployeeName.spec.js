import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe('Check EmployeeName response', () => {
  let response

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['getEmployeeName'], 'alias')
    cy.visit('/profile/employees')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('getEmployeeName response', () => {
    cy.getResponse(['getEmployeeName'], 'alias')
    cy.visit('/profile/employees')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
    const { __typename, name, id } = employeeData.employee
    const { employeeByEmail } = response

    checkKeyValueExist(employeeByEmail, { __typename, id, name })
  })
})
