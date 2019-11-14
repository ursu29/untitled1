import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'

export default function PortalLayout({ children }: PropsWithChildren<any>) {
  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      {children}
    </Layout>
  )
}
