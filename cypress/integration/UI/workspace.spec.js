import { locations, workspace, devMenu, postEl, matrix } from '../../support/locators'

describe('Workspace', () => {
  before(() => {
    cy.setToken('manager')
    cy.visit('/client/workspace-planner')
  })

  beforeEach(() => {
    cy.setImgToken('employee')
  })

  it('check all location', () => {
    locations.forEach(el => {
      cy.get(workspace.tab).contains(el.title).click()
      if (el.title !== 'Saint-Petersburg') {
        cy.spinnerDisappear(workspace.spinner)
        Object.values(workspace.disabled).forEach(el => cy.get(el).should('exist'))
        cy.get(workspace.img).should('not.exist')
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
    cy.spinnerDisappear(workspace.spinner)
    cy.get(devMenu.items).eq(0).click()
    cy.get(matrix.item).eq(1).click()
    cy.spinnerDisappear(workspace.spinner)
    cy.get(workspace.img)
      .should('be.visible')
      .and(img => expect(img[0].naturalWidth).to.be.greaterThan(0))
  })

  it('check design mode', () => {
    cy.get(postEl.buttonSwitch).should('not.exist')
  })
})
