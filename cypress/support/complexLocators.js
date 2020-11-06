import { devMenu, menuEl } from './locators'

export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`
export const inputSkill = id => cy.get('.ant-select-selector').eq(id)
export const postData = id => cy.get('.sc-gPEVay > span.ant-typography').eq(id)
export const inputTag = '.ant-form-item-control-input-content > .ant-select > .ant-select-selector'
export const postTitle = id => cy.get('.sc-gPEVay > h3.ant-typography').eq(id)
export const addSkill = id => cy.get('.ant-btn-link').eq(id)
export const getSelectItem = id => cy.get('.ant-select-tree-switcher').eq(id)
export const getListOfMatrix = () =>
  cy.get(
    '[data-cy=matrix-tabs] > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab',
  )

export const filterSkillsName = (name, arr) =>
  arr
    .filter(el => el.level.name === name && !el.skill.isMatrixOnly)
    .map(val => val.skill.name)
    .sort()

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then(doc => {
    if (doc.querySelectorAll(`[data-cy=${visibleEl}]`).length) {
      cy.getElement(visibleEl).should('have.text', text)

      return
    }
    cy.getElement(visibleEl).should('not.exist')
  })
})

Cypress.on('uncaught:exception', () => {
  return false
})

Cypress.Commands.add('elementIsPresent', el =>
  cy.document().then(doc => !!doc.querySelectorAll([el]).length),
)
Cypress.Commands.add('addRole', (name = 'SUPERUSER') => {
  cy.get(devMenu.items).click()
  cy.get(devMenu.item).contains(name).click()
  cy.get(menuEl.allMenu).should('be.visible')
})

Cypress.Commands.add('elementIsPresent', el =>
  cy.document().then(doc => !!doc.querySelectorAll([el]).length),
)

Cypress.Commands.add('deleteAllSkills', (el, removeEl) => {
  cy.elementIsPresent(el).then(bool => {
    if (bool) {
      cy.get(el).then(() => cy.get(removeEl).click({ multiple: true }))
    }
  })
})

Cypress.Commands.add('editSkills', idx => {
  addSkill(idx).click()
  inputSkill(idx).click()
  cy.get('.anticon-check').should('have.class', 'anticon-check')
})
