import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'
// import dark from '../../themes/dark'
// window.less.modifyVars(dark)

export default function PortalLayout({ children }: PropsWithChildren<any>) {
  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ minHeight: '100vh', display: 'flex', width: 1440 }}>{children}</div>
    </Layout>
  )
}
