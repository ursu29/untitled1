import { spinner, table, card } from '../../../support/locators'

describe('Check management page', () => {
  let allManagers
  let noManager
  const name = 'Alexander'
  const managerName = 'Alena'

  const cityFilter = (name, arr) => arr.filter(obj => obj.location === name)
  const cityAndNameFilter = (city, name, arr) =>
    cityFilter(city, arr).filter(el => el.name.includes(name))
  const filterCityAndManager = (city, name, arr) =>
    cityFilter(city, arr).filter(obj => obj.agileManager.name.includes(name))

  const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zurich']

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
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Check initial filter state', () => {
    ;[0, 1].forEach(el => cy.get('.ant-checkbox-input').eq(el).should('be.checked'))
    cy.get(table.tableRow).then(el => expect(el.length).equal(noManager.length))
    cy.get(card.title).eq(0).should('contain.text', 'Alan')
  })

  it('check filter', () => {
    const firstLocation = LOCATIONS[0]

    cy.get(table.filter).eq(1).click()
    LOCATIONS.forEach(el => cy.get(table.dropdownMenu).then(tab => expect(tab.text()).contains(el)))

    cy.contains(firstLocation).click()
    cy.contains('OK').click()
    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(cityFilter('Saint-Petersburg', noManager).length),
    )
  })

  it('search employee', () => {
    cy.scrollTo('top')
    cy.get(table.filter).eq(0).click()
    cy.getElement(table.inputSearch).type(name)
    cy.getElement(table.searchBtn).click({ force: true })

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(cityAndNameFilter('Saint-Petersburg', name, noManager).length),
    )
  })

  it('check reset', () => {
    cy.get(table.filter).eq(0).click()
    cy.getElement(table.resetBtn).click()

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(cityFilter('Saint-Petersburg', noManager).length),
    )
    cy.get(table.filter).eq(0).should('not.have.class', 'ant-dropdown-open')
  })

  it('manager search', () => {
    cy.get('.ant-checkbox-input').eq(0).click().should('not.be.checked')

    cy.get(table.filter).eq(2).click()
    cy.getElement(table.resetBtn).should('be.visible')
    cy.getElement(table.inputSearch).eq(1).type(managerName)
    cy.getElement(table.searchBtn).eq(1).click({ force: true })

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(
        filterCityAndManager('Saint-Petersburg', managerName, allManagers).length,
      ),
    )
  })
})
