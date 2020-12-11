import { updateEmployee } from '../../../support/getData'
import { checkKeyValueExist } from '../../../support/complexLocators'
import { agileManager } from '../../../support/client/employeeData'

describe('Edit Employee', () => {
  const getUserByName = (name, arr) => arr.filter(el => el.name === name)
  const { id, email } = agileManager

  before(() => {
    cy.setToken('manager')
    cy.post(updateEmployee(id, email), 'superUser')
  })

  it('add agile manager', () => {
    cy.getResponse(['employees', 'agileManager'], 'alias')
    cy.visit('/management')

    cy.wait('@alias').then(req => {
      const { employees } = req.response.body.data
      const allManagers = Object.values(employees).filter(el => el.agileManager)
      const firstEmployee = getUserByName(agileManager.name, allManagers)[0]

      checkKeyValueExist(firstEmployee.agileManager, { email, id })
    })
  })
})
