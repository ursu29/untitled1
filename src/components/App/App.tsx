import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { GATEWAY } from '../../config'
import Oauth from './Oauth'
import Root from './Root'
import { TokenProvider } from '../../utils/withToken'

const timezoneOffset = new Date().getTimezoneOffset()
const timezoneOffsetKey = 'x-timezone-offset'

const httpLink = new HttpLink({
  uri: GATEWAY + '/graphql',
})

const App: React.FC = () => {
  return (
    <Oauth>
      {(token: string) => {
        const authLink = setContext((_, { headers }) => {
          return {
            credentials: 'same-origin',
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
              [timezoneOffsetKey]: timezoneOffset,
              'dev-only-user-role': localStorage.getItem('devOnlyUserRole') || 'off',
            },
          }
        })

        const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        })

        client.writeData({
          data: {
            unauthenticated: false,
          },
        })

        return (
          <Router basename={process.env.REACT_APP_PUBLIC_URL}>
            <ApolloProvider client={client}>
              <LastLocationProvider>
                <TokenProvider token={token}>
                  <Root />
                </TokenProvider>
              </LastLocationProvider>
            </ApolloProvider>
          </Router>
        )
      }}
    </Oauth>
  )
}

export default App
