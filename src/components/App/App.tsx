import React from 'react'
import Secure from './Secure'
import Root from './Root'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { GATEWAY } from '../../config'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

const timezoneOffset = new Date().getTimezoneOffset()
const timezoneOffsetKey = 'x-timezone-offset'

const App: React.FC = () => {
  return (
    <Secure>
      {(token: string) => {
        const link = new HttpLink({
          uri: GATEWAY + '/graphql',
          credentials: 'same-origin',
          headers: {
            authorization: `Bearer ${token}`,
            [timezoneOffsetKey]: timezoneOffset,
          },
        })

        const client = new ApolloClient({
          link,
          cache: new InMemoryCache(),
        })

        return (
          <ApolloProvider client={client}>
            <Router basename={process.env.REACT_APP_PUBLIC_URL}>
              <Root />
            </Router>
          </ApolloProvider>
        )
      }}
    </Secure>
  )
}

export default App
