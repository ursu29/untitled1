const loginUrl =
    'https://login.microsoftonline.com/27d1d5a7-306f-4239-ab67-3bd61777078a/oauth2/v2.0/token'

const setBody = (userName, password, scope) => ({
    grant_type: Cypress.env('grant_type'),
    username: Cypress.env(userName),
    client_id: Cypress.env('client_id'),
    scope: Cypress.env(scope),
    password: Cypress.env(password),
    client_secret: Cypress.env('client_secret'),
})

let LOCAL_STORAGE_MEMORY = {}

const requestData = (name: string, password: string, scope: string) => ({
    url: loginUrl,
    method: 'POST',
    form: true,
    body: setBody(name, password, scope)
})

const getToken = (name: string, password: string, scope: string) =>
    cy.request(requestData(name, password, scope))
    .its('body.access_token')
    .then(token => {
        Cypress.env('accessToken', token)
        localStorage.setItem('access_token', token)
    })

export const setToken = (employeeType: string) => {
    console.log('Do we get variables values? As example, grant_type: ' + Cypress.env('grant_type'))
    switch (employeeType) {
        case 'employee':
            return getToken('employee_username', 'employee_password', 'scope')
        case 'manager':
            return getToken('manager_username', 'manager_password', 'scope')
        default:
            alert('Type of employee was not passed')
    }
}

export const setImgToken = (employeeType: string) => {
    const req = employeeType === 'employee' ? cy.request(requestData('employee_username', 'employee_password', 'img_scope'))
        : cy.request(requestData('manager_username', 'manager_password', 'img_scope'));

    req.its('body.access_token').then(token => {
        localStorage.setItem('img_token', token)
    })
}

export const saveLocalStorage = () => Object.keys(localStorage).forEach(key =>
    LOCAL_STORAGE_MEMORY[key] = localStorage[key])

export const restoreLocalStorage = () => Object.keys(LOCAL_STORAGE_MEMORY).forEach(key =>
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]))
