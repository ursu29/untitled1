import {email} from '../../support/client/employeeData'
import { tabs, workspace } from '../../support/locators'

describe('Employee check manager page', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit(`/employees/${email('manager')}`)
  })

  it('Employee cannot see manager private tabs', () => {
    ;[tabs.matrices, tabs.personal, tabs.cv, tabs.form].forEach(el =>
      cy.get(workspace.tab).contains(el).should('not.exist'),
    )
  })
})
