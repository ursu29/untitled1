
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { getSkill } from './complexLocators'

export const filterSkillsName = (name, arr) => arr.filter(el => el.level.name === name && !el.skill.isMatrixOnly)
  .map(val => val.skill.name).sort();

Cypress.Commands.add('getElement', name => cy.get(`[data-cy="${name}"]`));

Cypress.Commands.add('clickElement', (text) => cy.get('span').contains(text).click());

Cypress.Commands.add('checkLength', (name, length) => cy.getElement(name).its('length').should('eq', length));

Cypress.Commands.add('checkTextInArrayEl', (el, array, isDataAttr=true) => {
  const find = isDataAttr ?  cy.getElement(el) : cy.get(el);

  find.each((val, idx) => {
    expect(val.text()).contains(array[idx]);
  })
})

Cypress.Commands.add('isVisible', name => cy.getElement(name).should('be.visible'));

Cypress.Commands.add('checkSkills', (visibleEl, attrNameShort, attrName, array, text='No skills yet') => {
  cy.document().then((doc) => {
    if(doc.querySelectorAll(`[data-cy=${visibleEl}]`).length){
      cy.getElement(visibleEl).should('have.text', text)

      return ;
    }
    cy.checkTextInArrayEl(getSkill(attrNameShort),filterSkillsName(attrName, array), false)
  })
})

Cypress.Commands.add('selectFilterValue', (id, thText, name) => {
  cy.getElement(id).contains('th', thText).click('topRight');
  cy.clickElement(name);
  cy.contains('OK').click({force: true});
})

Cypress.Commands.add('matchText' , (el , text) => {
   cy.get(el).each(val => {
     const data = val.text()
     expect(data).match(text);
   });
})


Cypress.Commands.add('toEqualText' , (el , text, isAttr = false, idx= 0) => {
  const element = isAttr ? cy.getElement(el).eq(idx) : cy.get(el);

  element.each(val => {
    const data = val.text()
    expect(data).to.equal(text)
  });
})

Cypress.Commands.add('haveText', (name, text) => cy.getElement(name).should('have.text', text))
Cypress.Commands.add('haveClass', (name, className) => cy.getElement(name).should('have.class', className))
//better to move tokens to cypress.env.json sooner or later

//for real environment's backend MSAL authentication
Cypress.Commands.add('setToken', employeeType => {
console.log("Do we get variables values? As example, grant_type: " + Cypress.env('grant_type'))
  switch (employeeType) {
    case 'employee':
      cy.request({
        url:
          'https://login.microsoftonline.com/5acc8b65-db91-44ea-8d28-20f9e45b432e/oauth2/v2.0/token',
        method: 'POST',
        form: true,
        body: {
          grant_type: Cypress.env('grant_type'),
          username: Cypress.env('employee_username'),
          client_id: Cypress.env('client_id'),
          scope: Cypress.env('scope'),
          password: Cypress.env('employee_password'),
          client_secret: Cypress.env('client_secret'),
        },
      })
        .its('body.access_token')
        .then(token => {
          Cypress.env('accessToken', token)
          localStorage.setItem('access_token', token)
        })
      break
    case 'manager':
      cy.request({
        url:
          'https://login.microsoftonline.com/5acc8b65-db91-44ea-8d28-20f9e45b432e/oauth2/v2.0/token',
        method: 'POST',
        form: true,
        body: {
          grant_type: Cypress.env('grant_type'),
          username: Cypress.env('manager_username'),
          client_id: Cypress.env('client_id'),
          scope: Cypress.env('scope'),
          password: Cypress.env('manager_password'),
          client_secret: Cypress.env('client_secret'),
        },
      })
        .its('body.access_token')
        .then(token => {
          Cypress.env('accessToken', token)
          localStorage.setItem('access_token', token)
        })
      break
    default:
      alert('Type of employee was not passed')
  }
})

Cypress.Commands.add('openProfile', nameAndSurname => {
  cy.visit('/client/employees/' + nameAndSurname + '@sidenis.com/')
})
