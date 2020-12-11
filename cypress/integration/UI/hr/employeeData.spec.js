import { employeeData } from '../../../support/client/employeeData'
import { skillEl, workspace } from '../../../support/locators'
import { checkKeyValueExist } from '../../../support/complexLocators'
import { table, hr } from '../../../support/locators'

describe('Check employee data', () => {
  let runningProcess
  const randomNumber = new Date().getTime()

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['processExecutions', 'process', 'employee'], 'alias')
    cy.visit('/hr')
    cy.wait('@alias').then(req => {
      const { processExecutions } = req.response.body.data
      runningProcess = processExecutions.filter(el => el.status === 'running')
    })
  })

  it('Check number of process', () => {
    cy.get(table.tableRow).then(el => expect(el.length).equal(runningProcess.length))
  })

  it('Check default data', () => {
    const { id } = runningProcess[0]

    cy.get('div > a')
      .eq(1)
      .should('have.attr', 'href')
      .then(href => expect(href).equal(`/hr/${id}/`))
  })

  it('check process data', () => {
    const { name } = employeeData.employee
    const firstProcess = runningProcess[0]
    const { id } = firstProcess

    cy.setToken('manager')
    cy.visit(`/hr/${id}`)

    cy.scrollTo('bottom')
    cy.getElement(hr.name).clear().type(name)
    cy.getElement(hr.phone).clear().type(randomNumber)
    cy.get(workspace.data).click()

    cy.get(table.picker).eq(10).click()
    cy.getElement(hr.saveBtn).click()

    cy.get(skillEl.successMes).should('be.visible')
  })

  it('check data after update', () => {
    const { name } = employeeData.employee
    const firstProcess = runningProcess[0]
    const { id } = firstProcess
    cy.setToken('manager')

    cy.getResponse(['getProcessExecutions'], 'alias')
    cy.visit(`/hr/${id}`)
    cy.wait('@alias').then(req => {
      const { processExecutions } = req.response.body.data
      const { employee, employeePhone, finishDate } = processExecutions[0]

      expect(finishDate).contains('09')
      checkKeyValueExist(
        { employee, employeePhone },
        { employee: name, employeePhone: randomNumber.toString() },
      )
    })
  })
})
