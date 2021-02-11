import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe('Check EmployeeName response', () => {
  it('getEmployeeName response', () => {
    cy.setToken('manager')

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
