import { skillEl, hrTool, postEl } from '../../../support/locators'
import { popUp } from '../../../support/client/employeeData'
import * as data from '../../../support/getData'

describe('start new process', () => {
  let newProcess
  let processId

  before(() => {
    cy.setToken('manager')
    cy.visit('/hr')
    cy.getElement('start').click()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('create empty process', () => {
    cy.getId(hrTool.activeIdProcess).click()
    cy.getElement(hrTool.create).click()

    cy.get(hrTool.errorMess).should('be.visible')
  })

  it('Create main process', () => {
    cy.post(data.createNewProcess('offBoarding', 'ONBOARDING', 'INTERNAL'), 'superUser').then(
      res => {
        const { createProcess } = res.body.data

        processId = createProcess.id
      },
    )
  })

  it('create process with empty location/project', () => {
    cy.getId(hrTool.activeIdProcess).click()
    cy.get(postEl.itemsSelect).eq(4).click()
    cy.getElement(hrTool.create).click()
    cy.get(hrTool.errorMess).should('be.visible')
  })

  it('create new process', () => {
    cy.post(data.createProcess(processId), 'superUser').then(res => {
      const { createProcessExecution } = res.body.data
      const { id, __typename } = createProcessExecution
      newProcess = id

      expect(__typename).equal('ProcessExecution')
      expect(id.length).to.be.greaterThan(0)
    })
  })

  it('Abort new process', () => {
    cy.setToken('manager')
    cy.visit(`hr/${newProcess}`)

    cy.getElement(hrTool.abort).click()
    cy.get(popUp.button).contains('Yes').click()
    cy.get(skillEl.successMes).should('be.visible')
  })

  it('delete process', () => {
    cy.post(data.deleteProcess(processId), 'superUser').then(res =>
        expect(res.body.data.deleteProcess.id).equal(processId))
  })
})
