import React from 'react'
import { useGetDevToolsAccessQuery } from '../../queries/devtools'
import { useGetProfileQuery } from '../../queries/profile'
import { EmployeeProvider } from '../../utils/withEmployee'
import DevTools from '../DevTools'
import Layout from '../UI/Layout'
import NotAnswering from '../UI/NotAnswering'
import NotAuthorized from '../UI/NotAuthorized'
import SplashScreen from '../UI/SplashScreen'
import Pages from './Pages'
import Sider from './Sider'

export default function Root() {
  const { data, loading, error } = useGetProfileQuery()

  // Check access to ClientDevTools
  const { data: dataClientDevTools } = useGetDevToolsAccessQuery()

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
