import {
  ticket,
  createTickets,
  trainingLocators,
  mixTrainings,
  responsibleEmployeeTrainings,
} from '../../../support/client/training'
import { generateObjects } from '../../../support/utils'
import { postEl, workspace } from '../../../support/locators'

xdescribe('Check filter Trainings', () => {
  const count = 4

  before(() => {
    cy.setToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  context('All tickets completed', () => {
    it('default switch and all tickets completed', () => {
      cy.mockResponse(
        ['onboardingTickets'],
        createTickets(generateObjects(count, ticket(true, false))),
      )
      cy.visit('/onboarding')

      cy.get(postEl.buttonSwitch).should('not.have.class', 'ant-switch-checked')
      ;[0, 1].forEach(el =>
        cy.get(trainingLocators.activeTab).eq(el).should('have.text', 'nothing here'),
      )

      cy.get(workspace.tab).contains('Completed').eq(0).click()

      cy.getElement(trainingLocators.ticket).then(el => expect(el.length).equal(count))
      cy.get(postEl.successTag).then(el => expect(el.length).equal(count))
    })
  })

  context('Check SwissRe Trainings', () => {
    it('default switch and all tickets have SwissRe Trainings', () => {
      cy.mockResponse(
        ['onboardingTickets'],
        createTickets(generateObjects(count, ticket(true, true))),
      )
      cy.visit('/onboarding')

      cy.get(postEl.buttonSwitch).should('not.have.class', 'ant-switch-checked')
      ;[0, 1].forEach(el =>
        cy.get(trainingLocators.activeTab).eq(el).should('have.text', 'nothing here'),
      )

      cy.get(workspace.tab).contains('Completed').eq(0).click()

      cy.getElement(trainingLocators.ticket).then(el => expect(el.length).equal(count))
      cy.get(postEl.successTag).then(el => expect(el.length).equal(count))
    })

    it('Show all SwissRe tasks', () => {
      cy.get(postEl.buttonSwitch).click()
      cy.getElement(trainingLocators.ticket).then(el => expect(el.length).equal(count))
      cy.get(postEl.successTag).then(el => expect(el.length).equal(count))

      cy.get(trainingLocators.activeTab).eq(1).should('have.text', 'nothing here')
    })
  })

  context('All tickets isOptional', () => {
    it('default switch and all tickets completed', () => {
      cy.mockResponse(
        ['onboardingTickets'],
        createTickets(generateObjects(count, ticket(true, false, '5f904c2fe384ea001c0dd211'))),
      )
      cy.visit('/onboarding')

      cy.get(postEl.buttonSwitch).should('not.have.class', 'ant-switch-checked')
      cy.get(postEl.button).eq(0).should('have.text', 'Request training')
      cy.get(postEl.button).then(el => expect(el.length).equal(count))
    })
  })

  context('Check mix of tickets', () => {
    it('default switch and all tickets completed', () => {
      cy.mockResponse(['onboardingTickets'], createTickets(mixTrainings()))
      cy.visit('/onboarding')

      cy.get(postEl.buttonSwitch).should('not.have.class', 'ant-switch-checked')
      cy.get(postEl.button).eq(0).should('have.text', 'Request training')
      cy.get(postEl.button).then(el => expect(el.length).equal(2))

      cy.get(postEl.buttonSwitch).click()

      cy.get(postEl.button).then(el => expect(el.length).equal(2))
      cy.get(postEl.mainTag)
        .contains('SwissRe')
        .then(el => expect(el.length).equal(1))
      cy.get(workspace.tab).contains('Completed').eq(0).click()

      cy.get(trainingLocators.activeTab).eq(0).should('have.text', 'nothing here')
      cy.get(postEl.button).should('be.visible')
    })
  })

  context('Check tabs All/My Trainings', () => {
    const tabs = ['All', 'My Trainings']

    it('Check My Trainings tab', () => {
      cy.mockResponse(['onboardingTickets'], createTickets(responsibleEmployeeTrainings()))

      cy.visit('/onboarding')
      tabs.forEach(el => cy.get(workspace.tab).contains(el).should('be.visible'))

      cy.get(workspace.tab).contains(tabs[1]).click()

      expect(cy.getElement(trainingLocators.sendEmail).get('[href=""]').should('not.exist'))
      cy.getElement(trainingLocators.count).should('have.text', 0)
    })
  })
})
