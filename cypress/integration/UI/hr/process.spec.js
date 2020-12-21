import { workspace, paginationEl } from '../../../support/locators'
import { filterBy } from '../../../support/utils'

describe('Check active/inactive processes', () => {
  let runningProcess
  let holdProcess
  let canceledProcess
  const defaultCount = 10

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['processExecutions', 'process', 'employee'], 'alias')
    cy.visit('/hr')

    cy.wait('@alias').then(req => {
      const { processExecutions } = req.response.body.data

      runningProcess = filterBy(processExecutions, 'status', 'running')
      holdProcess = filterBy(processExecutions, 'status', 'holding')
      canceledProcess = filterBy(processExecutions, 'status', 'cancelled')
    })
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Check number of active ALL process', () => {
    if (runningProcess.length > defaultCount) {
      cy.get('.ant-table-row-level-0').then(el => expect(el.length).equal(defaultCount))

      return
    }
    cy.get('.ant-table-row-level-0').then(el => expect(el.length).equal(runningProcess.length))
    ;['Onboarding', 'Offboarding', 'Rotation'].forEach(el => cy.get(workspace.tab).contains(el))
  })

  it('Check number of hold process', () => {
    cy.get(workspace.tab).eq(1).click()

    if (holdProcess.length > defaultCount) {
      cy.getIcon('pause').then(el => expect(el.length).equal(defaultCount))

      return
    }
    cy.getIcon('pause').then(el => expect(el.length).equal(holdProcess.length))
  })

  it('Check number of cancelled pagination process', () => {
    cy.get(workspace.tab).eq(1).click()
    cy.get(workspace.tab).contains('Archived').click()

    if (canceledProcess.length > 20) {
      cy.getIcon('close').then(el => expect(el.length).equal(defaultCount))
      cy.get(paginationEl.number(2)).click({ force: true, multiple: true })

      cy.getIcon('close').then(el => expect(el.length).equal(defaultCount))

      return
    }

    cy.getIcon('close').then(el => expect(el.length).equal(defaultCount))
    cy.get(paginationEl.number(2)).click({ force: true, multiple: true })

    cy.getIcon('close').then(el => expect(el.length).equal(canceledProcess.length - defaultCount))
  })
})
