import React, { PropsWithChildren, useState, useEffect, useContext } from 'react'

const TokenContext = React.createContext<any>(null)

function TokenProvider(props: { token: any } & PropsWithChildren<any>) {
  const [token, setToken] = useState(props.token)

  const value = { token, setToken }

  useEffect(() => {
    setToken(props.token)
    //eslint-disable-next-line
  }, [JSON.stringify(props.token)])

  return <TokenContext.Provider value={value}>{props.children}</TokenContext.Provider>
}

const TokenConsumer = TokenContext.Consumer

function useToken() {
  const { token, setToken } = useContext(TokenContext)
  return { token, setToken }
}

export { TokenContext, TokenProvider, TokenConsumer, useToken }
