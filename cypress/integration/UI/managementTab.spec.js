import { spinner, table, card } from '../../support/locators'

describe('Check management page', () => {
  let allEmployees
  let noManager
  const cityFilter = name => noManager.filter(obj => obj.location === name)
  const cityAndNameFilter = (city, name) => cityFilter(city).filter(el => el.name.includes(name))

  const LOCATIONS = ['Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zurich']

  before(() => {
    cy.setToken('manager')
    cy.getResponse(['employees', 'agileManager'], 'alias')
    cy.visit('/management')
    cy.wait('@alias').then(req => {
      allEmployees = req.response.body.data.employees
      noManager = Object.values(allEmployees).filter(el => !el.agileManager)
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
    // noManager.length -1 not show one person if isMee=true
    cy.get(table.tableRow).then(el => expect(el.length).equal(noManager.length - 1))
    cy.get(card.title).eq(0).should('contain.text', 'Alberto')
  })

  it('check filter', () => {
    const firstLocation = LOCATIONS[0]

    cy.get(table.filter).eq(1).click()
    LOCATIONS.forEach(el => cy.get(table.dropdownMenu).then(tab => expect(tab.text()).contains(el)))

    cy.contains(firstLocation).click()
    cy.contains('OK').click()
    cy.get(table.tableRow).then(
      //-1 because manager from SP
      el => expect(el.length).equal(cityFilter('Saint-Petersburg').length - 1),
    )
  })

  it('search employee', () => {
    const name = 'Alexander'

    cy.scrollTo('top')
    cy.get(table.filter).eq(0).click()
    cy.get('.ant-input').type(name)
    cy.contains('Search').click({ force: true })

    cy.get(table.tableRow).then(el =>
      expect(el.length).equal(cityAndNameFilter('Saint-Petersburg', name).length),
    )
  })

  it('check reset', () => {
    cy.get(table.filter).eq(0).click()
    cy.get('.ant-input').clear()
    cy.get('.ant-btn').eq(1).click({ force: true })

    cy.get(table.tableRow).then(
      //-1 because manager from SP
      el => expect(el.length).equal(cityFilter('Saint-Petersburg').length - 1),
    )
    cy.get(table.filter).eq(0).should('not.have.class', 'ant-dropdown-open')
  })
})
