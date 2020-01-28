import React from 'react'
import ReactDOM from 'react-dom'
import Secure from './Secure'
import Root from './Root'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { GATEWAY } from '../../config'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const isNotAuthenticated = !!graphQLErrors.find(e => e.extensions?.code === 'UNAUTHENTICATED')
    if (isNotAuthenticated) {
      console.info('corrupted token, try to authorize again')
      client.writeData({ data: { unauthenticated: true } })
      ReactDOM.render(<App />, document.getElementById('root'))
    }
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: }`,
      ),
    )
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
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
