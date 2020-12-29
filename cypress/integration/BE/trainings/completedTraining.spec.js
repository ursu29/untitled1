import { getEmployeeTickets, createTraining } from '../../../support/getData'
import { postEl, skillEl } from '../../../support/locators'
import { popUp } from '../../../support/client/employeeData'
import { trainingData } from '../../../support/client/training'

describe('Completed training', () => {
  let allTickets
  const { title, description, responsible } = trainingData

  before(() => {
    cy.setToken('manager')
    cy.post(createTraining(title, description, responsible), 'superUser')
    cy.post(getEmployeeTickets()).then(req => {
      const { data } = req.body

      allTickets = data.employeeOnboardingTickets
    })
  })

  it('Complete tickets', () => {
    cy.setToken('employee')
    cy.visit('/onboarding')

    cy.get(postEl.button).eq(0).click()
    cy.get(popUp.button).contains('Yes').click()
    cy.get(skillEl.successMes).should('be.visible')
    cy.post(getEmployeeTickets()).then(req => {
      const { data } = req.body

      expect(data.employeeOnboardingTickets.length).to.be.greaterThan(allTickets.length)
    })
  })
})
