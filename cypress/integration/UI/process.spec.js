import { todaysDate } from '../../support/officePlanner/officeDays'
import {
  matrix,
  process,
  postEl,
  table,
  notificationEl,
  devMenu,
  collapseProcess,
} from '../../support/locators'
import { agileManager } from '../../support/client/employeeData'

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
    cy.visit('/')
    cy.addRole()
    cy.getResponse(['getProcesses'], 'alias')
    cy.visit('/client/processes')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  context('Create new process', () => {
    it('create new process', () => {
      cy.wait('@alias').then(el => {
        data.processes = [...el.response.body.data.processes]

        cy.get(notificationEl.button).contains('Create').click()
      })
      cy.getId(process.title).type(data.title)
      cy.getId(process.type).contains(data.type.OffBoarding).click()
      Object.values(data.type).forEach(el =>
        cy.getId(process.type).contains(el).should('be.visible'),
      )
      cy.getId(process.customer).click()
      cy.get(matrix.item).contains(data.customer.allianz).click()
      cy.getResponse(['getProcesses'], 'alias')
      cy.get(postEl.button).click()
      cy.wait('@alias').then(req => {
        const { processes } = req.response.body.data

        expect(data.processes.length).to.be.lessThan(processes.length)
        data.processes = [...processes]
      })
    })

    it('Add new step', () => {
      cy.getResponse(['getProcesses'], 'alias')
      cy.visit('/client/processes')
      cy.wait('@alias').then(_ => {
        cy.scrollTo('bottom')
        cy.get(table.itemList).last().contains(data.title).click()
        cy.get(collapseProcess.header).eq(0).click()
      })
    })

    it('Fill all the gaps', () => {
      cy.getId('title').clear().type(data.title)
      cy.getId('description').clear().type(data.title)
      cy.get(devMenu.menu).eq(0).click().type(agileManager.name)
      cy.get(matrix.item).contains(agileManager.name).click()

      cy.getResponse(['getProcesses'], 'alias')
      cy.get(postEl.button).contains('Save').click({ force: true })
      cy.wait('@alias').then(req => {
        const { processes } = req.response.body.data
        const firstStep = processes[0].steps[0]
        const { description, title, hasComment, responsibleUsers } = firstStep

        expect(processes[0].steps.length).equal(1)
        expect(description).equal(data.title)
        expect(title).equal(data.title)
        expect(hasComment).equal(false)
        expect(responsibleUsers[0].name).equal(agileManager.name)
      })
    })
  })

  context('Create new step', () => {
    it('Delete process', () => {
      cy.visit('/client/processes')
      cy.scrollTo('bottom')
      cy.get(postEl.iconDelete).last().click()
      cy.getResponse(['getProcesses'], 'alias')

      cy.get(postEl.button).contains('OK').click()
      cy.wait('@alias').then(req => {
        const lastProcessId = data.processes.map(el => el.id).pop()
        const { processes } = req.response.body.data

        expect(processes.map(el => el.id)).not.includes(lastProcessId)
      })
    })
  })
})
