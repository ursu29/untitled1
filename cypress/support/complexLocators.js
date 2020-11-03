export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`
export const inputSkill = id => cy.get('.ant-select-selector').eq(id)
export const addSkill = id => cy.get('.ant-btn-link').eq(id)
export const getSelectItem = id => cy.get('.ant-select-tree-switcher').eq(id)
export const getListOfMatrix = () => cy.get('[data-cy=matrix-tabs] > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab');

export const menu = {
  items: [
    { name: 'Onboarding', url: '/onboarding', text: 'Onboarding', show: false },
    { name: 'Employees', url: '/employees', text: null, show: true },
    { name: 'Projects', url: '/projects', text: 'Projects', show: true },
    { name: 'Guild', url: '/guilds', text: 'Guilds', show: true },
    { name: 'Skills', url: '/skills', text: 'Skills', show: true },
    { name: 'News', url: '/feed', text: 'News', show: true },
    { name: 'Vacancies', url: '/vacancies', text: 'Open vacancies', show: true },
    { name: 'Knowledge', url: '/knowledge', text: 'Knowledge', show: true },
    { name: 'WIKI', url: '/wiki', text: 'Wiki', show: true },
    { name: 'Feedback', url: '/feedback', text: 'Feedback', show: true },
  ],
  subMenu: [
    { name: 'Timemaster', url: '/timemaster', text: null, show: true },
    { name: 'Workspace', url: '/workspace-planner', text: null, show: true },
    { name: 'Office planner', url: '/office-planner', text: null, show: true },
    { name: 'HR Tool', url: '/client/hr', text: null, show: false },
    { name: 'Processes', url: '/client/processes', text: null, show: false },
    { name: 'Matrices', url: '/client/matrices', text: null, show: false },
  ],
}

export const devMenu = {
  menu: '.sc-frDJqD',
  items: '.ant-select-selection-item',
  item: '.ant-select-item',
}

export const menuEl = {
  allMenu: '.ant-menu',
  item: '.ant-menu-item',
  subItem: '.ant-menu-submenu-title',
  subMenu: '[id="tools$Menu"]',
  subMenuItem: '[id="tools$Menu"] > .ant-menu-item',
  title: '.ant-typography',
}
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


Cypress.Commands.add('elementIsPresent', el => cy.document().then(doc => !!doc.querySelectorAll([el]).length));
Cypress.Commands.add('addRole', (name = 'SUPERUSER') => {
  cy.get(devMenu.menu).click()
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
