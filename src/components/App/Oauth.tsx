import * as Msal from 'msal'
import React, { useEffect, useState } from 'react'

console.log('client_id', process.env.REACT_APP_AZURE_CLIENT)

const msalConfig: Msal.Configuration = {
  auth: {
    authority: 'https://login.microsoftonline.com/5acc8b65-db91-44ea-8d28-20f9e45b432e',
    clientId: process.env.REACT_APP_AZURE_CLIENT || '',
    redirectUri: window.location.origin + process.env.PUBLIC_URL,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

// @ts-ignore
const msalInstance = new Msal.UserAgentApplication(msalConfig)

msalInstance.handleRedirectCallback((error: any, response: any) => {
  console.log('redirect', error, response)
})

function Oauth({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem('access_token'))
  useEffect(() => {
    if (token) return
    async function authorize() {
      var tokenRequest = {
        scopes: [
          'User.Read',
          'Group.Read.All',
          'Sites.Read.All',
          'Member.Read.Hidden',
          'Directory.Read.All',
          'Contacts.Read',
          'AccessReview.Read.All',
        ],
      }
      try {
        if (!msalInstance.getAccount()) {
          msalInstance.loginRedirect(tokenRequest)
        }
        const response = await msalInstance.acquireTokenSilent(tokenRequest)
        setToken(response.accessToken)
        return response.accessToken
      } catch (e) {
        console.log('silent token acquisition fails.')
        if (e instanceof Msal.InteractionRequiredAuthError) {
          console.log('acquiring token using redirect')
          msalInstance.acquireTokenRedirect(tokenRequest)
        } else {
          console.error(e)
        }
      }
    }
    authorize()
    // eslint-disable-next-line
  }, [])

  if (!token) return <div>Authorizing...</div>
  return children(token)
}

export default Oauth
