const URL = 'https://portal.dev.syncretis.com/graphql'

export const post = (body: any, superUser = null, methodName = 'POST') => {
  return cy.request({
    url: URL,
    method: methodName,
    headers: {
      'content-type': 'application/json',
      'dev-only-user-role': superUser,
    },
    body: body,
  })
}
