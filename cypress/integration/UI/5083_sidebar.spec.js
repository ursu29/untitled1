import { menu, menuEl } from '../../support/locators'

describe('Check Manager menu', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.get(menuEl.allMenu).should('be.visible')
  })

  it('check all menu', () => {
    menu.items.forEach(val =>
      cy.get(menuEl.item).contains(val.name).should('contain.text', val.name),
    )

    cy.get(menuEl.subItem).click()
    menu.subMenu
      .filter(el => el.show)
      .forEach(val =>
        cy.get(menuEl.subMenuItem).contains(val.name).should('contain.text', val.name),
      )
  })
})
