import React, { useEffect } from 'react'
import Layout from '../UI/Layout'
import Pages from './Pages'
import Sider from './Sider'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NotAuthorized from '../UI/NotAuthorized'
import NotAnswering from '../UI/NotAnswering'
import DevTools from '../DevTools'
import { EmployeeProvider } from '../../utils/withEmployee'
import { Modal } from 'antd'
import { Profile } from '../../types'
import SplashScreen from '../UI/SplashScreen'

const query = gql`
  {
    profile {
      id
      strapiId
      email
      strapiGroupsMembership
      location
    }
    isAuthenticated
  }
`

export default function Root({ tokenExpired }: { tokenExpired: boolean }) {
  const { data, loading, error } = useQuery<{ profile: Profile; isAuthenticated: boolean }>(query)

  // Check access to ClientDevTools
  const { data: dataClientDevTools } = useQuery(
    gql`
      {
        clientDevToolsAccess
      }
    `,
  )

  useEffect(() => {
    if (tokenExpired) {
      Modal.warning({
        title: 'Token expired',
        okText: 'Reload page',
        onOk: () => window.location.reload(),
      })
    }
  }, [tokenExpired])

  if (loading) return <SplashScreen />

  if (data?.isAuthenticated) {
    return (
      <Layout>
        <EmployeeProvider value={data?.profile}>
          <Sider />
          <Pages />
          {dataClientDevTools?.clientDevToolsAccess && <DevTools />}
        </EmployeeProvider>
      </Layout>
    )
  }

  if (error) {
    return <NotAnswering />
  }

  return <NotAuthorized />
}
