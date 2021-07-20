import { matricesAccess } from '../../support/client/employeeData'

describe(`Check employee getEmployee`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('matricesAccess response', () => {
    cy.getResponse(['matricesAccess'], 'alias')
    cy.visit('/profile')

    cy.compareTwoJson('alias', matricesAccess)
  })
})
