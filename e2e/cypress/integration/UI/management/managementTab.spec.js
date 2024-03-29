import { mainCity, spinner, table } from '../../../support/locators'
import { LOCATIONS } from '../../../support/getData'

describe('Check management page', () => {
  let allManagers
  let noManager
  const managerName = 'Alena'

  const cityFilter = (name, arr) => arr.filter(obj => obj.location === name)
  const filterCityAndManager = (city, name, arr) =>
    cityFilter(city, arr).filter(obj => obj.agileManager.name.includes(name))

  before(() => {
    cy.setToken('manager')

    cy.getResponse(['employees', 'agileManager'], 'alias')
    cy.visit('/management')
    cy.wait('@alias').then(req => {
      const { employees } = req.response.body.data

      noManager = Object.values(employees).filter(el => !el.agileManager)
      allManagers = Object.values(employees).filter(el => el.agileManager)
    })
    cy.get(spinner.active).should('not.exist')
  })

  beforeEach(() => {
    cy.addHeadersAuth()
  })
  afterEach(() => {
    cy.addHeadersAuth()
  })

  it('Check initial filter state', () => {
    ;[0, 1].forEach(el => cy.get('.ant-checkbox-input').eq(el).should('be.checked'))
    cy.get('.ant-checkbox-input').eq(1).click()
    cy.get(table.tableRow).then(el => expect(el.length).equal(noManager.length))
  })

  it('check filter', () => {
    cy.get('.ant-dropdown-trigger').eq(1).click()
    LOCATIONS.forEach(el => cy.get(table.dropdownMenu).then(tab => expect(tab.text()).contains(el)))
    cy.get(table.dropdownMenu).eq(0).click()
    cy.contains('OK').click()
    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(cityFilter(mainCity, noManager).length),
    )
  })

  it('check reset', () => {
    cy.get('.ant-dropdown-trigger').eq(1).click()

    cy.get('span').contains('Reset').click()

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(noManager.length),
    )
  })

  it('manager search', () => {
    cy.get('.ant-checkbox-input').eq(0).click().should('not.be.checked')

    cy.getIcon(table.inputSearch).eq(1).type(managerName)
    cy.getElement(table.searchBtn).click({ force: true })

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(filterCityAndManager(mainCity, managerName, allManagers).length),
    )
  })
})
