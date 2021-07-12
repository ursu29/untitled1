import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { YMInitializer } from 'react-yandex-metrika'
import { GATEWAY } from '../../config'
import SplashScreen from '../UI/SplashScreen'
import Metrics from './Metrics'
import Root from './Root'

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
        curriculumVitae: {
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

export default function App() {
  const [errorCode, setErrorCode] = useState<number>()

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(error => {
        if (error.extensions?.code === 'UNAUTHENTICATED') {
          console.error(`401: UNAUTHENTICATED`)
        }
        console.error(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
        )
      })
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
      if ((networkError as any)?.statusCode === 401) setErrorCode(401)
    }
  })

  const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig),
  })

  if (errorCode === 401) {
    window.location.href = `${GATEWAY}/auth/microsoft`
    return <SplashScreen />
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <Root />
        {process.env.REACT_APP_YANDEX_METRIKA && <Metrics />}
      </ApolloProvider>
      {process.env.REACT_APP_YANDEX_METRIKA && (
        <YMInitializer
          accounts={[Number(process.env.REACT_APP_YANDEX_METRIKA)]}
          options={{ webvisor: true }}
        />
      )}
    </Router>
  )
}
