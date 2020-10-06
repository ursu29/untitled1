import React, { PropsWithChildren, useState, useEffect, useContext } from 'react'
import jwt from 'jsonwebtoken'

const TokenContext = React.createContext<any>(null)

const prepareScope = (scp?: string) => {
  if (!scp) return []
  return scp.split(' ').map(i => i.toLowerCase())
}

function TokenProvider(props: { token: any } & PropsWithChildren<any>) {
  const decoded: any = jwt.decode(props.token)

  const [token, setToken] = useState(props.token)
  const [scope, setScope] = useState(prepareScope(decoded?.scp))
  const value = { token, scope, setToken }

  useEffect(() => {
    setToken(props.token)
    const decoded: any = jwt.decode(props.token)
    setScope(prepareScope(decoded?.scp))

    //eslint-disable-next-line
  }, [JSON.stringify(props.token)])

  return <TokenContext.Provider value={value}>{props.children}</TokenContext.Provider>
}

const TokenConsumer = TokenContext.Consumer

function useToken() {
  const { token, scope, setToken } = useContext<{
    token: string
    scope: string[]
    setToken: (token: string) => void
  }>(TokenContext)
  return { token, scope, setToken }
}

export { TokenContext, TokenProvider, TokenConsumer, useToken }
