import React, { useEffect } from 'react'
import Layout from '../UI/Layout'
import Pages from './Pages'
import Sider from './Sider'
import NotAuthorized from '../UI/NotAuthorized'
import NotAnswering from '../UI/NotAnswering'
import DevTools from '../DevTools'
import { EmployeeProvider } from '../../utils/withEmployee'
import { Modal } from 'antd'
import { useGetProfileQuery } from '../../queries/profile'
import { useGetDevToolsAccessQuery } from '../../queries/devtools'
import SplashScreen from '../UI/SplashScreen'

export default function Root({ tokenExpired }: { tokenExpired: boolean }) {
  const { data, loading, error } = useGetProfileQuery()

  // Check access to ClientDevTools
  const { data: dataClientDevTools } = useGetDevToolsAccessQuery()

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
