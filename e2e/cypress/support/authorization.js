const loginUrl =
  'https://login.microsoftonline.com/27d1d5a7-306f-4239-ab67-3bd61777078a/oauth2/v2.0/token'
export const strapiUrl = 'https://portal-strapi.dev.syncretis.com'

export const setBody = (userName, password, scope) => ({
  grant_type: Cypress.env('grant_type'),
  username: Cypress.env(userName),
  client_id: Cypress.env('client_id'),
  scope: Cypress.env(scope),
  password: Cypress.env(password),
  client_secret: Cypress.env('client_secret'),
})
Cypress.Commands.add('setImgToken', employeeType => {
  let req
  if (employeeType === 'employee') {
    req = cy.request({
      url: loginUrl,
      method: 'POST',
      form: true,
      body: setBody('employee_username', 'employee_password', 'img_scope'),
    })
  } else {
    req = cy.request({
      url: loginUrl,
      method: 'POST',
      form: true,
      body: setBody('manager_username', 'manager_password', 'img_scope'),
    })
  }
  req.its('body.access_token').then(token => {
    localStorage.setItem('img_token', token)
  })
})

Cypress.Commands.add('setToken', employeeType => {
  console.log('Do we get variables values? As example, grant_type: ' + Cypress.env('grant_type'))
  switch (employeeType) {
    case 'employee':
      cy.request({
        url: loginUrl,
        method: 'POST',
        form: true,
        body: setBody('employee_username', 'employee_password', 'scope'),
      })
        .its('body.access_token')
        .then(token => {
          Cypress.env('accessToken', token)
          localStorage.setItem('access_token', token)
        })
      break
    case 'manager':
      cy.request({
        url: loginUrl,
        method: 'POST',
        form: true,
        body: setBody('manager_username', 'manager_password', 'scope'),
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
