import { employeeData, email } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { subUser } from '../../support/client/myEmployees'
import { getEmployee } from '../../support/getData'
import {checkTwoString} from "../../support/utils";
import {query} from "../../fixtures/query";

describe('Check manager employees', () => {
  let response
  let request
  let managerId
  const OPERATION_NAME = 'getSubordinates'

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('employee')

    cy.post(getEmployee(email('employee'))).then(res => (managerId = res.body.id))
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/profile/employees')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('getSubordinates response', () => {
    const { __typename, id, name, position, email } = employeeData.employee
    const { employeeByEmail } = response
    const { subordinateUsers } = employeeByEmail

    cy.compareObjectsKeys(subordinateUsers[0], subUser)
    checkKeyValueExist(employeeByEmail, { managerId, __typename })
    checkKeyValueExist(subordinateUsers[0], { __typename, id, name, position, email })
  })

  it('check request body', () => {
    checkTwoString(query.getSubordinates, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })
})
