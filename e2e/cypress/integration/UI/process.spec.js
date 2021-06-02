import { todaysDate } from '../../support/officePlanner/officeDays'
import {
  matrix,
  process,
  postEl,
  table,
  notificationEl,
  collapseProcess,
} from '../../support/locators'

describe('Check the process', () => {
  const data = {
    title: `developer: ${todaysDate}`,
    type: {
      onBoarding: 'Onboarding',
      OffBoarding: 'Offboarding',
      rotate: 'Rotation',
    },
    customer: {
      internal: 'Internal',
      swissre: 'Swissre',
      allianz: 'Allianz',
    },
    processes: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.visit('/processes')

    cy.addRole()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('create new process', () => {
    cy.get(notificationEl.button).contains('Create').click()
    cy.getId(process.title).type(data.title)
    cy.getId(process.type).contains(data.type.OffBoarding).click()
    Object.values(data.type).forEach(el => cy.getId(process.type).contains(el).should('be.visible'))
    cy.getId(process.customer).click()
    cy.get(matrix.item).contains(data.customer.allianz).click()
    cy.getResponse(['processes', 'title'], 'alias')
    cy.get(postEl.button).click()
  })

  it('Add new step', () => {
    cy.visit('/processes')
    cy.scrollTo('bottom')
    cy.get(table.itemList).last().contains(data.title).click()
    cy.get(collapseProcess.header).eq(0).click()
  })

  it('Fill all the gaps', () => {
    cy.getId('title').clear().type(data.title)
    cy.getId('description').clear().type(data.title)
    cy.getResponse(['getProcesses'], 'alias')
    cy.get(postEl.button).contains('Save').click({ force: true })
    cy.wait('@alias').then(req => {
      const { process } = req.response.body.data
      const firstStep = process.steps[0]
      const { description, title, hasComment } = firstStep

      expect(process.steps.length).equal(1)
      expect(description).equal(data.title)
      expect(title).equal(data.title)
      expect(hasComment).equal(false)
    })
  })

  it('Delete process', () => {
    cy.visit('/processes')
    cy.scrollTo('bottom')
    cy.get(postEl.iconDelete).last().click()
    cy.getResponse(['deleteProcess'], 'alias')

    cy.get(postEl.button).contains('OK').click()
    cy.wait('@alias').then(req => expect(req.response.statusCode).equal(200))
  })
})
