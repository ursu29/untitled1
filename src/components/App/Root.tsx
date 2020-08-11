import React from 'react'
import Layout from '../UI/Layout'
import Pages from './Pages'
import Sider from './Sider'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NotAuthorized from '../UI/NotAuthorized'
import NotAnswering from '../UI/NotAnswering'
import DevTools from '../DevTools'
import { EmployeeProvider } from '../../utils/withEmployee'

const query = gql`
  {
    profile {
      id
      email
    }
    isAuthenticated
  }
`

export default function Root() {
  const { data, loading, error } = useQuery(query)

  if (loading) return null

  if (data?.isAuthenticated) {
    return (
      <Layout>
        <EmployeeProvider value={data?.profile}>
          <Sider />
          <Pages />
          {process.env.NODE_ENV === 'development' && <DevTools />}
        </EmployeeProvider>
      </Layout>
    )
  }

  if (error) {
    return <NotAnswering />
  }

  return <NotAuthorized />
}
