import { matricesAccess } from '../../support/client/employeeData'

describe(`Check employee getEmployee`, () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('manager')
  })

  it('matricesAccess response', () => {
    cy.getResponse(['matricesAccess'], 'alias')
    cy.visit('/profile')

    cy.compareTwoJson('alias', matricesAccess)
  })
})
