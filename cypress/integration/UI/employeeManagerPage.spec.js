import { employeeData } from '../../support/client/employeeData'
import { tabs, workspace } from '../../support/locators'

describe('Employee check manager page', () => {
  const { email } = employeeData.employee.agileManager
  before(() => {
    cy.setToken('employee')
    cy.visit(`/employees/${email}`)
  })

  it('Employee cannot see manager private tabs', () => {
    ;[tabs.matrices, tabs.personal, tabs.cv, tabs.form].forEach(el =>
      cy.get(workspace.tab).contains(el).should('not.exist'),
    )
  })
})
