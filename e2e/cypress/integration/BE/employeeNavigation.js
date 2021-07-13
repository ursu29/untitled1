import { email } from '../../support/client/employeeData'
import { getEmployee } from '../../support/getData'
import { checkKeyValueExist } from '../../support/complexLocators'
import {
  matrixEmployees,
  skillData,
  grade,
  group,
} from '../../support/client/matrices'
import { checkTwoString, getSubTabUrl } from '../../support/utils'
import { query } from '../../fixtures/query'

describe(`Check employee matrices`, () => {
  let response
  let request
  let employeeData

  const OPERATION_NAME = 'getEmployeeMatrices'

  before(() => {
    cy.setToken('employee')

    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData = { ...data.employeeByEmail }
    })
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit(getSubTabUrl('career', '/profile', 'matrices'))
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('Check matrixEmployees keys', () => {
    const { id, name, __typename } = employeeData
    const { employees } = response

    expect(employees).to.be.a('array')
    cy.compareObjectsKeys(employees[0], matrixEmployees(id, name, __typename))

    employees.forEach(el => {
      expect(el.matrices).to.be.a('array')
      expect(el.isMe).to.be.a('boolean')
      // employee data is present
      checkKeyValueExist(el, { id, name, __typename })
    })

    employees[0].matrices.forEach(el => {
      const {grades, groups, skills} = el.body

      cy.compareObjectsKeys(groups[0], group)
      cy.compareObjectsKeys(grades[0], grade)
      cy.compareObjectsKeys(skills[0].skill, skillData)
    })

    //check request body
    checkTwoString(query.getAllEmployeeMatrices, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })
})

