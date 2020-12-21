import { skillEl, hrTool, postEl } from '../../../support/locators'
import { popUp } from '../../../support/client/employeeData'

describe('start new process', () => {
  let newProcess

  before(() => {
    cy.setToken('manager')
    cy.visit('/hr')
    cy.getElement('start').click()
  })

  it('create empty process', () => {
    cy.getId(hrTool.activeIdProcess).click()
    cy.getElement(hrTool.create).click()

    cy.get(hrTool.errorMess).should('be.visible')
  })

  it('create process with empty location/project', () => {
    cy.getId(hrTool.activeIdProcess).click()
    cy.get(postEl.itemsSelect).eq(4).click()
    cy.getElement(hrTool.create).click()
    cy.get(hrTool.errorMess).should('be.visible')
  })

  it('start new process and abort it', () => {
    cy.getId(hrTool.processName).eq(1).click().type('Portal{enter}')

    cy.get(hrTool.selectItem).eq(1).click()
    cy.get(postEl.itemsSelect).contains('Saint-Petersburg').click({ force: true })

    cy.getResponse(['createProcessExecution'], 'alias')
    cy.getElement(hrTool.create).click()
    cy.wait('@alias').then(req => {
      const { createProcessExecution } = req.response.body.data

      newProcess = createProcessExecution.id
    })
    cy.get(skillEl.successMes).should('be.visible')
  })

  it('Abort new process', () => {
    cy.setToken('manager')
    cy.visit(`hr/${newProcess}`)

    cy.getElement(hrTool.abort).click()
    cy.get(popUp.button).contains('Yes').click()
    cy.get(skillEl.successMes).should('be.visible')
  })
})
