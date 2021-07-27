export const getEmployeeAttributes = (attributes, userId) => {
  return cy.fixture('employee.json').then(content => {
    let replacedBody = JSON.stringify(content)
      .replace(/ATTRIBUTES_TO_REPLACE/, attributes)
      .replace(/ID_TO_REPLACE/, userId)
    cy.request({
      url: '/graphql',
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + Cypress.env('accessToken'),
        'content-type': 'application/json',
      },
      body: replacedBody,
    })
  })
}
