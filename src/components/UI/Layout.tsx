import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import { CONTENT_WIDTH } from '../../config'

export default function PortalLayout({ children }: PropsWithChildren<any>) {
  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ minHeight: '100vh', display: 'flex', width: CONTENT_WIDTH }}>{children}</div>
    </Layout>
  )
}
