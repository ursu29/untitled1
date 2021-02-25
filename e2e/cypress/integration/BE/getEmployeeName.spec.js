import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { checkTwoString } from '../../support/utils'
import { query } from '../../fixtures/query'

describe('Check EmployeeName response', () => {
  let request
  const OPERATION_NAME = 'getEmployeeName'

  it('getEmployeeName response', () => {
    cy.setToken('manager')

    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/profile/employees')

    cy.wait(`@alias`).then(val => {
      request = val.request.body
      const response = val.response.body.data

      const { __typename, name, id } = employeeData.employee
      const { employee } = response

      checkKeyValueExist(employee, { __typename, id, name })

      checkTwoString(query.getEmployeeName, request.query)
      expect(request.operationName).equal(OPERATION_NAME)
    })
  })
})
