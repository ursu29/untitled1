import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  InMemoryCacheConfig,
  HttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GATEWAY } from '../../config'
import Oauth from './Oauth'
import Root from './Root'
import { TokenProvider } from '../../utils/withToken'
import { onError } from '@apollo/client/link/error'
import { YMInitializer } from 'react-yandex-metrika'
import Metrics from './Metrics'

const timezoneOffset = new Date().getTimezoneOffset()
const timezoneOffsetKey = 'x-timezone-offset'

const httpLink = new HttpLink({
  uri: GATEWAY + '/graphql',
})

const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Employee: {
      fields: {
        hobbies: {
          merge: false,
        },
      },
    },
    Query: {
      fields: {
        hobbyPosts: {
          keyArgs: false,
          merge(existing = [], incoming, { variables }) {
            // fetchMore
            if (variables?.input?.after) {
              return [...existing, ...incoming]
            }
            // useQuery/refetch
            return incoming
          },
        },
      },
    },
  },
}

const App: React.FC = () => {
  const [tokenExpired, setTokenExpired] = useState(false)
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

        const errorLink = onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
              if (message.includes('401: Unauthorized')) {
                // this error comes from Azure. this is client only handler
                console.info('probably token was expired')
                setTokenExpired(true)
              }
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              )
            })
          if (networkError) console.log(`[Network error]: ${networkError}`)
        })

        const client = new ApolloClient({
          link: errorLink.concat(authLink).concat(httpLink),
          cache: new InMemoryCache(cacheConfig),
        })

        return (
          <Router>
            <ApolloProvider client={client}>
              <TokenProvider token={token}>
                <Root tokenExpired={tokenExpired} />
                {process.env.REACT_APP_YANDEX_METRIKA && <Metrics />}
              </TokenProvider>
            </ApolloProvider>
            {process.env.REACT_APP_YANDEX_METRIKA && (
              <YMInitializer
                accounts={[Number(process.env.REACT_APP_YANDEX_METRIKA)]}
                options={{ webvisor: true }}
              />
            )}
          </Router>
        )
      }}
    </Oauth>
  )
}

export default App
