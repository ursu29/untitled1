import { menu, menuEl } from '../../support/locators'

describe('Check Menu', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.get(menuEl.allMenu).should('be.visible')
  })

  it('Check all menu names is present', () => {
    cy.checkTextInArrayEl(
      menuEl.item,
      menu.items.filter(el => el.show).map(el => el.name),
      false,
    )
    cy.get(menuEl.subItem).should('have.text', 'Tools')
    cy.get(menuEl.subItem).click()
    cy.checkTextInArrayEl(
      menuEl.subMenuItem,
      menu.subMenu.filter(el => el.show).map(el => el.name),
      false,
    )
  })

  it('Check all menu tabs', () => {
    menu.items
      .filter(el => el.show)
      .forEach(val => {
        cy.get(menuEl.item).contains(val.name).click()
        cy.url().should('include', val.url)
      })
    menu.subMenu
      .filter(el => el.show)
      .forEach(val => {
        cy.get(menuEl.subMenuItem).contains(val.name).click()
        cy.url().should('include', val.url)
        if (val.text) {
          cy.get(menuEl.title).should('contain.text', val.text)
        }
      })
  })
})
