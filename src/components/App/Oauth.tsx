import * as Msal from 'msal'
import React, { useEffect, useState } from 'react'
import SplashScreen from '../UI/SplashScreen'

const msalConfig: Msal.Configuration = {
  auth: {
    authority: 'https://login.microsoftonline.com/27d1d5a7-306f-4239-ab67-3bd61777078a',
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

const MINUTE = 1000 * 60

function Oauth({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem('access_token'))

  useEffect(() => {
    if (token) return
    let timeout: ReturnType<typeof setTimeout>
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
          // 'Application.ReadWrite.All',
          // 'Directory.AccessAsUser.All',
        ],
      }
      try {
        if (!msalInstance.getAccount()) {
          msalInstance.loginRedirect(tokenRequest)
        }
        const response = await msalInstance.acquireTokenSilent(tokenRequest)
        const expiresIn = new Date(response.expiresOn).getTime()
        const now = new Date().getTime()
        setToken(response.accessToken)
        timeout = setTimeout(() => {
          setToken(null)
          authorize()
        }, expiresIn - now - MINUTE)
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
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [])

  if (!token) return <SplashScreen />
  return children(token)
}

export default Oauth
