const loginUrl =
  'https://login.microsoftonline.com/27d1d5a7-306f-4239-ab67-3bd61777078a/oauth2/v2.0/token'
export const strapiUrl = 'https://portal-strapi.dev.syncretis.com'

export const managerData = (id = '603f592a7ae138001c21f6bd', email = 'test.manager@syncretis.com') =>
  JSON.stringify({id, email})
export const getEmployeeData = (id = '603f592a7ae138001c21f6bc', email = 'test.employee@syncretis.com') =>
  JSON.stringify({id, email})

export const setBody = (userName, password, scope) => ({
  grant_type: Cypress.env('grant_type'),
  username: Cypress.env(userName),
  client_id: Cypress.env('client_id'),
  scope: Cypress.env(scope),
  password: Cypress.env(password),
  client_secret: Cypress.env('client_secret'),
})

Cypress.Commands.add('auth', employeeType => {
  process.env.EMPLOYEE_TYPE = employeeType;

  cy.intercept('/graphql', req => {
    employeeType === 'employee' ? req.headers['dev-only-auth-disable'] = getEmployeeData() :
      req.headers['dev-only-auth-disable'] = managerData()
  })
})

Cypress.Commands.add('getToken', () => {
  switch (process.env.EMPLOYEE_TYPE) {
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
}
})

Cypress.Commands.add('setToken', employeeType => cy.auth(employeeType))
