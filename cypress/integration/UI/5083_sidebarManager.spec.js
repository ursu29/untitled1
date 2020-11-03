import { menu, menuEl } from '../../support/complexLocators'

describe('Check Manager menu', () => {
  before(() => {
    cy.setToken('manager')
    cy.visit('/')
    cy.get(menuEl.allMenu).should('be.visible')
  })

  it('Check all menu names is present', () => {
    cy.addRole()
    cy.get(menuEl.allMenu).should('be.visible')
    cy.checkTextInArrayEl(
      menuEl.item,
      menu.items.map(el => el.name),
      false,
    )
    cy.get(menuEl.subItem).should('have.text', 'Tools')
    cy.get(menuEl.subItem).click()
    cy.checkTextInArrayEl(
      menuEl.subMenuItem,
      menu.subMenu.map(el => el.name),
      false,
    )
  })

  it('Check all menu tabs', () => {
    menu.items.forEach(val => {
      cy.get(menuEl.item).contains(val.name).click()
      cy.url().should('include', val.url)
    })
    menu.subMenu.forEach(val => {
      cy.get(menuEl.subMenuItem).contains(val.name).click()
      cy.url().should('include', val.url)
      if (val.text) {
        cy.get(menuEl.title).should('contain.text', val.text)
      }
    })
  })
})
