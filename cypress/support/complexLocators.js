
export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`;
export const inputSkill = id => cy.get('.ant-select-selector').eq(id);
export const addSkill = id => cy.get('.ant-btn-link').eq(id);
export const getSelectItem = id => cy.get('.ant-select-tree-switcher').eq(id);

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then((doc) => {
    if(doc.querySelectorAll(`[data-cy=${visibleEl}]`).length){
      cy.getElement(visibleEl).should('have.text', text)

      return ;
    }
    cy.getElement(visibleEl).should('not.exist')
  })
});

Cypress.on('uncaught:exception', () => {
  return false
})


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
