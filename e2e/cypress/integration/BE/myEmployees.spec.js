import { email } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { getEmployee } from '../../support/getData'
import { checkTwoString, getProfileTabUrl } from '../../support/utils'
import { query } from '../../fixtures/query'

describe('Check manager employees', () => {
  let response
  let request
  let employeeData
  const OPERATION_NAME = 'getSubordinates'

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('manager')

    cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit(getProfileTabUrl('employees'))
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('getSubordinates response', () => {
    const { __typename, id, name, position, email } = employeeData
    const { subordinateUsers } = response.employeeByEmail

    checkKeyValueExist(subordinateUsers[0], { __typename, id, name, position, email })
    checkTwoString(query.getSubordinates, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })
})
