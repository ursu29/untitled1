import * as Msal from 'msal'
import React, { useEffect, useState } from 'react'
import SplashScreen from '../UI/SplashScreen'
import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider'
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client'
import jwt from 'jsonwebtoken'

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

const MINUTE = 1000 * 60

const scopes = [
  'User.Read',
  'Group.Read.All',
  'Sites.Read.All',
  'Member.Read.Hidden',
  'Directory.Read.All',
  'Contacts.Read',
  'AccessReview.Read.All',
  // 'Directory.ReadWrite.All',
  // 'Application.ReadWrite.All',
  // 'Directory.AccessAsUser.All',
]

// Azure client SDK for sending requests to Microsoft Graph API
const options = new MSALAuthenticationProviderOptions(scopes)
const authProvider = new ImplicitMSALAuthenticationProvider(msalInstance, options)
export const azureClient = MicrosoftGraph.Client.initWithMiddleware({
  authProvider,
})

function Oauth({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem('access_token'))

  useEffect(() => {
    if (token) return
    let timeout: ReturnType<typeof setTimeout>
    async function authorize() {
      var tokenRequest = {
        scopes,
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

  const decoded: any = jwt.decode(token)

  return children(token, decoded?.oid)
}

export default Oauth
