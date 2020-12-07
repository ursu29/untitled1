import { getEmployeeTickets } from '../../../support/getData'
import { postEl, skillEl } from '../../../support/locators'

describe('Completed training', () => {
  let allTickets

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployeeTickets()).then(req => {
      const { data } = req.body
      allTickets = data.employeeOnboardingTickets
    })
    cy.visit('/onboarding')
  })

  it('Complete tickets', () => {
    cy.get(postEl.button).eq(0).click()
    cy.get(skillEl.successMes).should('be.visible')
    cy.post(getEmployeeTickets()).then(req => {
      const { data } = req.body

      expect(data.employeeOnboardingTickets.length).to.be.greaterThan(allTickets.length)
    })
  })
})
