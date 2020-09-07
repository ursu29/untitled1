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
