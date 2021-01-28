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
    cy.visit('/profile/employees')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
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
