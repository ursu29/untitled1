import {email} from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { checkTwoString, getProfileTabUrl } from '../../support/utils'
import { query } from '../../fixtures/query'
import {getEmployee} from "../../support/getData";

describe('Check EmployeeName response', () => {
  let request
  let employeeData
  const OPERATION_NAME = 'getEmployeeName'

  before(() => {
    cy.setToken('manager')

    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      employeeData = employeeByEmail
    })
  })

  it('getEmployeeName response', () => {
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit(getProfileTabUrl('employees'))

    cy.wait(`@alias`).then(val => {
      request = val.request.body
      const response = val.response.body.data

      const { __typename, name, id } = employeeData
      const { employee } = response

      checkKeyValueExist(employee, { __typename, id, name })

      checkTwoString(query.getEmployeeName, request.query)
      expect(request.operationName).equal(OPERATION_NAME)
    })
  })
})
