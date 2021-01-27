import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe('Check EmployeeName response', () => {
  before(() => {
    cy.setToken('manager')
    cy.visit('/')
  })

  it('getEmployeeName response', () => {
    cy.getResponse(['getEmployeeName'], 'alias')
    cy.visit('/profile/employees')
    cy.wait(`@alias`).then(val => {
      const response = val.response.body.data

      const { __typename, name, id } = employeeData.employee
      const { employeeByEmail } = response

      checkKeyValueExist(employeeByEmail, { __typename, id, name })
    })
  })
})
