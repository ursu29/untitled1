const URL = 'https://portal.dev.syncretis.com/graphql'

export const post = (body: any, superUser = null, methodName = 'POST') => {
  return cy.request({
    url: URL,
    method: methodName,
    headers: {
      authorization: `Bearer ${Cypress.env('accessToken')}`,
      'content-type': 'application/json',
      'dev-only-user-role': superUser,
    },
    body: body,
  })
}
