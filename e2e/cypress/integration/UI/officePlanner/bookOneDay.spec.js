import {table, spinner, postEl} from '../../../support/locators'

describe('Office planner book one day (office-planner)', () => {
  const todayToggle = `${table.activeTab} > ${postEl.buttonSwitch}`
  let text

  before(() => {
    cy.setToken('employee')
    cy.visit('/office-planner')

    cy.get(spinner.active).should('be.visible')
    cy.get(spinner.active).should('not.exist')

    cy.get(table.activeTab).then(el => text = el.text())
  })

  after(() => {
    cy.get(todayToggle).click()
  })

  it('book one day', () => {
    cy.get(todayToggle).click()

    cy.get(spinner.active).should('be.visible')
    cy.get(spinner.active).should('not.exist')
    cy.get(table.activeTab).then(el => expect(el.text()).not.equal(text))
  })
})
