import { devMenu, menuEl } from './locators'

export const getElement = (value: string) => cy.get(`[data-cy="${value}"]`)
export const clickElement = (text: string) => cy.get('span').contains(text).click()
export const haveText = (name: string, text: string) => getElement(name).should('have.text', text)

export const addRole = (name = 'SUPERUSER') => {
  cy.get(devMenu.items).click({ multiple: true })
  cy.get(devMenu.item).contains(name).click({ force: true })
  cy.get(menuEl.allMenu).should('be.visible')
}

export const checkTextInArrayEl = (el: string, array: string[], isDataAttr = true) => {
  const find = isDataAttr ? getElement(el) : cy.get(el)

  find.each((val: JQuery<HTMLElement>, idx:number) => expect(val.text()).contains(array[idx]))
}
