import { menu } from '../../support/complexLocators'

export const menuEl = {
  allMenu: '.ant-menu',
  item: '.ant-menu-item',
  subItem: '.ant-menu-submenu-title',
  subMenu: '[id="tools$Menu"]',
  subMenuItem: '[id="tools$Menu"] > .ant-menu-item',
  title: '.ant-typography',
}

describe('Check Menu', () => {

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.get(menuEl.allMenu).should('be.visible');
  })

  it('Check all menu names is present', () => {
    cy.checkTextInArrayEl(menuEl.item, menu.items.map(el => el.name), false);
    cy.get(menuEl.subItem).should('have.text', 'Tools');
    cy.get(menuEl.subItem).click();
    cy.checkTextInArrayEl(menuEl.subMenuItem, menu.subMenu.map(el => el.name) , false);
  });

  it('Check all menu tabs', () => {
    menu.items.forEach(val => {
      cy.get(menuEl.item).contains(val.name).click();
      cy.url().should('include', val.url);
    })
    menu.subMenu.forEach(val => {
      cy.get(menuEl.subMenuItem).contains(val.name).click();
      cy.url().should('include', val.url);
      if(val.text) {
       cy.get(menuEl.title).should('contain.text', val.text)
      }
    })
  })
});
