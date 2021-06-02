import { notificationEl } from '../../../support/locators'

describe('TimeMaster', () => {
  const message = "If timemaster is not available, probably you're not authorized"

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
  })

  it('Click on the "Timemaster"', () => {
    cy.getElement('timemaster').click()

    cy.get(notificationEl.title).should('be.visible')
    cy.get(notificationEl.title).should('have.text', message)
    cy.get(notificationEl.button).should('be.visible')
    cy.get(notificationEl.button).should('have.text', 'Login')
    cy.getElement(notificationEl.errIframe).should('be.visible')
  })
})
