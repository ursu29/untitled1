import { locations, workspace, devMenu, matrix } from '../../../support/locators'
import * as auth from '../../../support/authorize'
import { addRole, getElement } from '../../../support/mainCommands'

// workspace changed
xdescribe('Workspace', () => {
  const city = 'Saint Petersburg'

  before(() => {
    auth.setToken('manager')
    auth.setImgToken('manager')

    cy.visit('/workspace-planner')
  })

  beforeEach(() => {
    auth.restoreLocalStorage()
  })
  afterEach(() => {
    auth.saveLocalStorage()
  })

  it('check all location', () => {
    locations.forEach(el => {
      cy.get(workspace.tab).contains(el.title).click()
      if (el.title === 'Tomsk') {
        cy.get(workspace.img).should('be.visible')
      }
      if (el.title === city) {
        cy.get(workspace.img)
          .should('be.visible')
          .and(img => expect(img[0].naturalWidth).to.be.greaterThan(0))
      }
    })
  })

  it('change Saint-Petersburg workspace', () => {
    cy.get(workspace.tab).contains(city).click()
    cy.get(devMenu.items).eq(0).click()
    cy.get(matrix.item).eq(1).click()
    cy.get(workspace.img).should('be.visible')
  })

  it('check design mode', () => {
    addRole()
    auth.setImgToken('manager')

    cy.get('[role=switch]').first().click({ multiple: true })
    ;['edit', 'addNew'].forEach(el => getElement(el).should('be.visible'))
  })
})
