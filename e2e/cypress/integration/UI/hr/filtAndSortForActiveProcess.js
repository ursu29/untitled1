import { getTabUrl } from '../../../support/utils';
import { getActiveProcesses } from '../../../fixtures/processes';

describe('Check filtering and sorting are available for all columns in the table (Active processes)', () => {

  const playCircleColorAsc = '[fill="orange"]'
  const playCircleColorDesc = '[fill="#52c41a"]'
  const playCircleColorSignCount = 2

  const processNameSortAsc = 'offBoarding'
  const processNameSortDesc = 'Test Rotation'
  const processName = 'Onboarding SwissRe'
  const processNameTable = /Onboarding SwissRe/

  const projectNameSortAsc = 'az-mcp'
  const projectNameSortDesc = 'Timemaster'
  const projectName = 'SwissRe Comet'
  const projectNameTable = /Comet/

  const locationNameSortAsc = 'Kaliningrad'
  const locationNameSortDesc = 'Zürich'
  const locationName = 'Saint Petersburg'
  const locationNameTable = /Saint-P/

  const positionNameSortAsc = 'Automation QA'
  const positionNameSortDesc = 'Manual QA Engineer'
  const positionName = 'Java Developer'
  const positionNameTable = /Java Developer/

  const employeeNameSortAsc = 'Daria Ermishkina'
  const employeeNameSortDesc = 'Trevor ONBOARDING'

  const finishDateSortAsc = '05.12.1900'
  const finishDateSortDesc = '27.05.2021'

  const responsibleQuantitySortAsc = 7
  const responsibleQuantitySortDesc = 2

  const prioritySortAsc = 1
  const prioritySortDesc = 3

  const responsibleName = 'Ekaterina Sogonova'

  before(() => {
    cy.setToken('manager')
    cy.mockResponse(['processExecutions'], getActiveProcesses())
    cy.visit(getTabUrl('Active', 'hr'))

  })

   it('Sort all columns', () => {

    cy.getIcon('caret-up')
      .eq(0)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(0)
      .find(playCircleColorAsc).should('have.length', playCircleColorSignCount)
    cy.getIcon('caret-down')
      .eq(0)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(0)
      .find(playCircleColorDesc).should('have.length', playCircleColorSignCount)

    cy.getIcon('caret-up')
      .eq(1)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(1)
      .should('contain', processNameSortAsc)
    cy.getIcon('caret-down')
      .eq(1)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(1)
    .should('contain', processNameSortDesc)

    cy.getIcon('caret-up')
      .eq(2)
      .click({force: true})
    cy.get('tbody tr')
      .eq(1)
      .children()
      .eq(2)
      .should('contain', projectNameSortAsc)
    cy.getIcon('caret-down')
      .eq(2)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(2)
    .should('contain', projectNameSortDesc)

    cy.getIcon('caret-up')
      .eq(3)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(3)
      .should('contain', locationNameSortAsc)
    cy.getIcon('caret-down')
      .eq(3)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(3)
      .should('contain', locationNameSortDesc)

    cy.getIcon('caret-up')
      .eq(4)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(4)
      .should('be.empty')
    cy.get('tbody tr')
      .eq(2)
      .children()
      .eq(4)
      .should('contain', positionNameSortAsc)
    cy.getIcon('caret-down')
      .eq(4)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(4)
      .should('contain', positionNameSortDesc)

    cy.getIcon('caret-up')
      .eq(5)
      .click({force: true})
    cy.get('tbody tr')
      .eq(2)
      .children()
      .eq(5)
      .should('contain', employeeNameSortAsc)
    cy.getIcon('caret-down')
      .eq(5)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(5)
      .should('contain', employeeNameSortDesc)

    cy.getIcon('caret-up')
      .eq(6)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(6)
      .should('contain', finishDateSortAsc)
    cy.getIcon('caret-down')
      .eq(6)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(6)
      .should('contain', finishDateSortDesc)

    cy.getIcon('caret-up')
      .eq(7)
      .click({force: true})
    cy.get('tbody tr')
      .eq(2)
      .find('[data-cy="avatar"]').should('have.length', responsibleQuantitySortAsc)
    cy.getIcon('caret-down')
      .eq(7)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(7)
      .find('[data-cy="avatar"]').should('have.length', responsibleQuantitySortDesc)

    cy.getIcon('caret-up')
      .eq(8)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(8)
      .should('contain', prioritySortAsc)
    cy.getIcon('caret-down')
      .eq(8)
      .click({force: true})
    cy.get('tbody tr')
      .children()
      .eq(8)
      .should('contain', prioritySortDesc)

   })

   it('Filter by process, location and position', () => {

    cy.getIcon('search')
      .eq(0)
      .click()
    cy.getElement('search')
      .click()
      .type(processName)
    cy.getElement('btnSearch')
      .click()

    cy.getIcon('filter').eq(1).click()
    cy.clickElement(locationName)
    cy.contains('OK').click({force: true})

    cy.getIcon('search')
      .eq(1)
      .click()
    cy.getElement('search')
      .eq(1)
      .click()
      .type(positionName)
    cy.getElement('btnSearch')
      .eq(1)
      .click()
    cy.matchText('[data-row-key]', processNameTable)
    cy.matchText('[data-row-key]', locationNameTable)
    cy.matchText('[data-row-key]', positionNameTable)

    ;[0, 1].forEach((el) => {
      cy.getIcon('search').eq(el).click()
      cy.getElement('reset').eq(el).click()
      })

    cy.getIcon('filter').eq(1).click()
    cy.clickElement(locationName)
    cy.contains('OK').click({force: true})

    })

   it('Filter Project column', () => {

    cy.viewport(1960, 1280)

    cy.getIcon('filter').eq(2).click()
    cy.get('span').contains(responsibleName).click()
    cy.contains('OK').click({force: true})

    cy.getIcon('filter').eq(0).click()
    cy.get('span').contains(projectName).click()
    cy.contains('OK').click({force: true})
    cy.matchText('[data-row-key]', projectNameTable)

    cy.getElement('avatar').eq(1).trigger('mouseover')
    cy.getRole('tooltip').should('contain', responsibleName)

    ;[0, 2].forEach((el) => {
      cy.getIcon('filter').eq(el).click()
      cy.contains('Reset').click({force: true})
      })

   })

})