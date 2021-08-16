import {email} from '../../support/client/employeeData'
import {checkTwoString, getTabUrl} from '../../support/utils'
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
    cy.visit(getTabUrl('employees'))

    cy.wait(`@alias`).then(val => {
      request = val.request.body
      const response = val.response.body.data

      const { email, id, name } = response.employee

      expect(email).contain('@syncretis.com')
      expect(id.length).equal(24)
      expect(name.length).to.be.greaterThan(0)

      checkTwoString(query.getEmployeeName, request.query)
      expect(request.operationName).equal(OPERATION_NAME)
    })
  })
})
