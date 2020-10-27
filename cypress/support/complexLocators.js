
export const getSkill = name => `[data-cy=${name}] > [data-cy=skills_name] > .ant-tag`;

Cypress.Commands.add('checkIfElementPresent', (visibleEl, text) => {
  cy.document().then((doc) => {
    if(doc.querySelectorAll(`[data-cy=${visibleEl}]`).length){
      cy.getElement(visibleEl).should('have.text', text)

      return ;
    }
    cy.getElement(visibleEl).should('not.exist')
  })
});