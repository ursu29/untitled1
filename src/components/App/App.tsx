import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GATEWAY } from '../../config'
import Root from './Root'
import Secure from './Secure'

const timezoneOffset = new Date().getTimezoneOffset()
const timezoneOffsetKey = 'x-timezone-offset'

const httpLink = new HttpLink({
  uri: GATEWAY + '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    credentials: 'same-origin',
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      [timezoneOffsetKey]: timezoneOffset,
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

const App: React.FC = () => {
  return (
    <Secure>
      <ApolloProvider client={client}>
        <Router basename={process.env.REACT_APP_PUBLIC_URL}>
          <Root />
        </Router>
      </ApolloProvider>
    </Secure>
  )
}

export default App
