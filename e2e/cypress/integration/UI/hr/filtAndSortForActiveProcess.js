import { getTabUrl } from '../../../support/utils';
import { getActiveProcesses } from '../../../fixtures/processes';

describe('Check filtering and sorting are available for all columns in the table (Active processes)', () => {

  const processName = 'Onboarding SwissRe'
  const processNameTable = /Onboarding SwissRe/
  const projectName = 'SwissRe Comet'
  const projectNameTable = /Comet/
  const locationName = 'Saint Petersburg'
  const locationNameTable = /Saint-P/
  const positionName = 'Java Developer'
  const positionNameTable = /Java Developer/
  const employeeNameSort = 'Daria Ermishkina'
  const prioritySort = 3
  const responsibleName = 'Ekaterina Sogonova'

  before(() => {
    cy.setToken('manager')
    cy.mockResponse(['processExecutions'], getActiveProcesses())
    cy.visit(getTabUrl('Active', 'hr'))

  })

   it('Filter the active processes table by location, position and responsible, sort by priority in descending order', () => {

    cy.viewport(1960, 1280)

    ;[locationName, responsibleName].forEach((el1, ind1) => {
       cy.getIcon('filter').eq(ind1 + 1).click()
       cy.clickElement(el1)
       cy.contains('OK').click({force: true})
     })
    cy.getIcon('search').eq(1).click()
    cy.getIcon('search').eq(1).click().type(positionName)
    cy.getElement('btnSearch').click()
    cy.getIcon('caret-up').eq(8).dblclick({force: true})

    ;[locationNameTable, positionNameTable].forEach(el2 => {
       cy.matchText('[data-row-key]', el2)
     })
    cy.getElement('avatar').eq(1).trigger('mouseover')
    cy.getRole('tooltip').should('contain', responsibleName)
    cy.get('tbody tr').children().eq(8).should('contain', prioritySort)


    cy.getIcon('caret-up').eq(8).click({force: true})
    ;[1, 2].forEach(ind2 => {
       cy.getIcon('filter').eq(ind2).click()
       cy.contains('Reset').click({force: true})
     })
    cy.getIcon('search').eq(1).click()
    cy.getElement('reset').click()

    })

   it('Filter the active processes table by process, project, location, sort by employee in descending order', () => {

    cy.viewport(1960, 1280)

    cy.getIcon('search').eq(0).click()
    cy.getIcon('search').eq(0).click({force: true}).type(processName)
    cy.getElement('btnSearch').eq(0).click({force: true})

    ;[projectName, locationName].forEach((el3, ind3) => {
      cy.getIcon('filter').eq(ind3).click()
      cy.clickElement(el3)
      cy.contains('OK').click({force: true})
     })

    ;[processNameTable, projectNameTable, locationNameTable].forEach(el4 => {
      cy.matchText('[data-row-key]', el4)
     })
    cy.get('tbody tr').children().eq(5).should('contain', employeeNameSort)

   })

})