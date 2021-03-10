import * as Msal from 'msal'

const msalConfig: Msal.Configuration = {
  auth: {
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT}`,
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

export default msalInstance
