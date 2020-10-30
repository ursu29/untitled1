import * as Msal from 'msal'
import { useEffect, useState } from 'react'
import msalInstance from './msalInstanse'

type Token = string | null

const MINUTE = 1000 * 6

type TokenArgs = {
  scopes: string[]
}

const tokens: Record<string, Token> = {}

function useToken({ scopes }: TokenArgs) {
  const id = 'token_' + scopes.toString()
  const [token, setToken] = useState<Token>(tokens[id])

  const updateToken = (newToken: Token) => {
    tokens[id] = newToken
    setToken(newToken)
  }

  useEffect(() => {
    if (token) return
    let timeout: ReturnType<typeof setTimeout>
    async function authorize() {
      var tokenRequest = { scopes }
      try {
        if (!msalInstance.getAccount()) {
          msalInstance.loginRedirect(tokenRequest)
        }
        const response = await msalInstance.acquireTokenSilent(tokenRequest)
        const expiresIn = new Date(response.expiresOn).getTime()
        const now = new Date().getTime()

        const newToken = response.accessToken
        updateToken(newToken)

        timeout = setTimeout(() => {
          updateToken(null)
          authorize()
        }, expiresIn - now - MINUTE)

        return response.accessToken
      } catch (e) {
        updateToken(null)
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
      updateToken(null)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [])

  return { token }
}

export function useFileStorageToken() {
  return useToken({
    scopes: ['https://storage.azure.com/user_impersonation'],
  })
}

export function useAccessToken() {
  return useToken({
    scopes: [
      'User.Read',
      'Group.Read.All',
      'Sites.Read.All',
      'Member.Read.Hidden',
      'Directory.Read.All',
      'Contacts.Read',
      'AccessReview.Read.All',
    ],
  })
}
