
export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`;
export const inputSkill = id => cy.get('.ant-select-selector').eq(id);
export const addSkill = id => cy.get('.ant-btn-link').eq(id);

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then((doc) => {
    if(doc.querySelectorAll(`[data-cy=${visibleEl}]`).length){
      cy.getElement(visibleEl).should('have.text', text)

      return ;
    }
    cy.getElement(visibleEl).should('not.exist')
  })
});