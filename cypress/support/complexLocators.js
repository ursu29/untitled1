
export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`;
export const inputSkill = id => cy.get('.ant-select-selector').eq(id);
export const addSkill = id => cy.get('.ant-btn-link').eq(id);
export const getSelectItem = id => cy.get('.ant-select-tree-switcher').eq(id);
export const menu = {
  items: [
    { name: 'Employees', url: '/employees', text: null },
    { name: 'Projects', url: '/projects', text: 'Projects'},
    { name: 'Guild', url: '/guilds',  text: 'Guilds'},
    { name: 'Skills', url: '/skills', text: 'Skills'},
    { name: 'News', url: '/feed', text: 'News'},
    { name: 'Vacancies', url: '/vacancies', text: 'Open vacancies'},
    { name: 'Knowledge', url: '/knowledge', text: 'Knowledge'},
    { name: 'WIKI', url: '/wiki', text: 'Wiki'},
    { name: 'Feedback', url: '/feedback', text: 'Feedback'},
  ],
  subMenu: [
    { name: 'Timemaster', url: '/timemaster' , text: null},
    { name: 'Workspace', url: '/workspace-planner', text: null},
    { name: 'Office planner', url: '/office-planner', text: null},
  ]
}
export const filterSkillsName = (name, arr) =>
  arr
    .filter(el => el.level.name === name && !el.skill.isMatrixOnly)
    .map(val => val.skill.name)
    .sort()

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then((doc) => {
    if(doc.querySelectorAll(`[data-cy=${visibleEl}]`).length){
      cy.getElement(visibleEl).should('have.text', text)

      return ;
    }
    cy.getElement(visibleEl).should('not.exist')
  })
});

Cypress.Commands.add('elementIsPresent', el => cy.document().then(doc => !!doc.querySelectorAll([el]).length));

Cypress.Commands.add('deleteAllSkills', (el, removeEl) => {
  cy.elementIsPresent(el).then(bool => {
    if(bool) {
      cy.get(el).then(() => cy.get(removeEl).click({ multiple: true }))
    }
  })
})

Cypress.Commands.add('editSkills', (idx) => {
  addSkill(idx).click();
  inputSkill(idx).click();
  cy.get('.anticon-check').should('have.class', 'anticon-check');
})
