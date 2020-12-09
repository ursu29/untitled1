import { getEmployeeTickets } from '../../../support/getData'
import { postEl, skillEl } from '../../../support/locators'
import { popUp } from '../../../support/client/employeeData'

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
    cy.get(popUp.button).contains('Yes').click()
    cy.get(skillEl.successMes).should('be.visible')
    cy.post(getEmployeeTickets()).then(req => {
      const { data } = req.body

      expect(data.employeeOnboardingTickets.length).to.be.greaterThan(allTickets.length)
    })
  })
})
