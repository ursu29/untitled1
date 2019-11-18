import React from 'react'
import Layout from '../UI/Layout'
import Pages from './Pages'
import Sider from './Sider'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NotAuthorized from '../UI/NotAuthorized'

const query = gql`
  {
    unauthenticated @client
  }
`

export default function Root() {
  const { data } = useQuery(query)
  const { unauthenticated } = data
  return unauthenticated ? (
    <NotAuthorized />
  ) : (
    <Layout>
      <Sider />
      <Pages />
    </Layout>
  )
}
