import { locations, workspace, devMenu, matrix } from '../../support/locators'

describe('Workspace', () => {
  before(() => {
    cy.setToken('manager')
    cy.visit('/workspace-planner')
    cy.checkImgToken('manager')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('check all location', () => {
    locations.forEach(el => {
      cy.get(workspace.tab).contains(el.title).click()
      if (el.title !== 'Saint-Petersburg') {
        Object.values(workspace.disabled).forEach(el => cy.get(el).should('exist'))
      }
      if (el.title === 'Saint-Petersburg') {
        Object.values(workspace.disabled).forEach(el => cy.get(el).should('not.exist'))
        cy.get(workspace.img)
          .should('be.visible')
          .and(img => expect(img[0].naturalWidth).to.be.greaterThan(0))
      }
    })
  })

  it('change Saint-Petersburg workspace', () => {
    cy.get(workspace.tab).contains(locations[0].title).click()
    cy.get(devMenu.items).eq(0).click()
    cy.get(matrix.item).eq(1).click()
    cy.get(workspace.img)
      .should('be.visible')
      .and(img => expect(img[0].naturalWidth).to.be.greaterThan(0))
  })

  it('check design mode', () => {
    cy.addRole()
    cy.checkImgToken('manager')
    cy.get('[role=switch]').first().click({ multiple: true })
    ;['edit', 'addNew'].forEach(el => cy.getElement(el).should('be.visible'))
  })
})
